import Std
set_option warningAsError true
namespace ChapterTwoSearch

-- 2.3-1 / 2.3-3: identify the unconsumed output at every loop boundary.
abbrev merge (as bs : List Nat) := as.merge bs (fun a b => decide (a ≤ b))

theorem left_step (out l r : List Nat) (a b : Nat) (h : a ≤ b) :
    out ++ merge (a::l) (b::r) = (out ++ [a]) ++ merge l (b::r) := by
  simp [merge, h, List.append_assoc]

theorem right_step (out l r : List Nat) (a b : Nat) (h : ¬ a ≤ b) :
    out ++ merge (a::l) (b::r) = (out ++ [b]) ++ merge (a::l) r := by
  simp [merge, h, List.append_assoc]

theorem merge_ok (l r : List Nat) (hl : l.Pairwise (· ≤ ·)) (hr : r.Pairwise (· ≤ ·)) :
    (merge l r).Pairwise (· ≤ ·) ∧ (merge l r).Perm (l ++ r) := by
  constructor
  · have hh := List.pairwise_merge (le := fun a b : Nat => decide (a ≤ b))
        (by simp; omega) (by simp; omega) l r (by simpa using hl) (by simpa using hr)
    simpa using hh
  · exact List.merge_perm_append _

example : ([3,41,52,26,38,57,9,49] : List Nat).mergeSort = [3,9,26,38,41,49,52,57] := by
  simp +decide [List.mergeSort, List.MergeSort.Internal.splitInTwo, List.splitAt_eq]

-- 2.3-6 / 2.3-8. a is constant-time indexed storage. Only [lo,lo+w) is inspected.
def binary (a : Nat → Int) (key : Int) : Nat → Nat → Nat → Option Nat
  | 0, _, _ => none
  | fuel+1, lo, w =>
    if w = 0 then none else
    let m := lo + w/2
    if a m = key then some m
    else if key < a m then binary a key fuel lo (w/2)
    else binary a key fuel (m+1) (w-w/2-1)

def SortedOn (a : Nat → Int) (lo w : Nat) :=
  ∀ i j, lo ≤ i → i ≤ j → j < lo+w → a i ≤ a j

def Answer (a : Nat → Int) (key : Int) (lo w : Nat) : Option Nat → Prop
  | none => ∀ i, lo ≤ i → i < lo+w → a i ≠ key
  | some i => lo ≤ i ∧ i < lo+w ∧ a i = key

theorem binary_ok (a : Nat → Int) (key : Int) (fuel lo w : Nat)
    (small : w < 2^fuel) (hs : SortedOn a lo w) :
    Answer a key lo w (binary a key fuel lo w) := by
  induction fuel generalizing lo w with
  | zero => simp at small; simp [binary, Answer, small]; omega
  | succ f ih =>
    rw [Nat.pow_succ] at small
    by_cases empty : w = 0
    · simp [binary, Answer, empty]; omega
    rw [binary, if_neg empty]
    dsimp only
    split
    next hit => exact ⟨by omega, by omega, hit⟩
    next miss =>
      split
      next lt =>
        have h := ih lo (w/2) (by omega) (fun i j hi hij hj => hs i j hi hij (by omega))
        cases e : binary a key f lo (w/2) with
        | some j => rw [e] at h; exact ⟨h.1, by have := h.2.1; omega, h.2.2⟩
        | none =>
          rw [e] at h
          intro i hi stop
          by_cases side : i < lo+w/2
          · exact h i hi side
          · have := hs (lo+w/2) i (by omega) (by omega) stop
            omega
      next gt =>
        have h := ih (lo+w/2+1) (w-w/2-1) (by omega)
          (fun i j hi hij hj => hs i j (by omega) hij (by omega))
        cases e : binary a key f (lo+w/2+1) (w-w/2-1) with
        | some j =>
          rw [e] at h
          obtain ⟨hj, hk, eq⟩ := h
          exact ⟨by omega, by omega, eq⟩
        | none =>
          rw [e] at h
          intro i hi stop
          by_cases side : i ≤ lo+w/2
          · have := hs i (lo+w/2) hi side (by omega)
            omega
          · exact h i (by omega) (by omega)

def twoSum (a : Nat → Int) (n : Nat) (x : Int) :=
  (List.range n).any fun i => (binary a (x-a i) (n.log2+1) (i+1) (n-i-1)).isSome

theorem twoSum_ok (a : Nat → Int) (n : Nat) (x : Int) (hs : SortedOn a 0 n) :
    twoSum a n x = true ↔ ∃ i j, i < j ∧ j < n ∧ a i + a j = x := by
  have test (i : Nat) (hi : i < n) :
      (binary a (x-a i) (n.log2+1) (i+1) (n-i-1)).isSome = true ↔
        ∃ j, i < j ∧ j < n ∧ a i + a j = x := by
    have bound := ((Nat.log2_eq_iff (n := n) (k := n.log2) (by omega)).mp rfl).2
    have h := binary_ok a (x-a i) (n.log2+1) (i+1) (n-i-1) (by omega)
      (fun k t _ hkt ht => hs k t (by omega) hkt (by omega))
    cases e : binary a (x-a i) (n.log2+1) (i+1) (n-i-1) with
    | some j =>
      rw [e] at h
      obtain ⟨hj,hk,eq⟩ := h
      simp only [Option.isSome_some, true_iff]
      exact ⟨j, by omega, by omega, by omega⟩
    | none =>
      rw [e] at h
      simp only [Option.isSome_none, Bool.false_eq_true, false_iff]
      rintro ⟨j,hj,hk,eq⟩
      exact h j (by omega) (by omega) (by omega)
  simp only [twoSum, List.any_eq_true, List.mem_range]
  constructor
  · rintro ⟨i,hi,h⟩; exact ⟨i,(test i hi).mp h⟩
  · rintro ⟨i,j,hij,hjn,h⟩
    exact ⟨i,by omega,(test i (by omega)).mpr ⟨j,hij,hjn,h⟩⟩

def probes (a : Nat → Int) (key : Int) : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | f+1, lo, w =>
    if w=0 then 0 else
    let m := lo+w/2
    if a m=key then 1 else if key<a m then 1+probes a key f lo (w/2)
    else 1+probes a key f (m+1) (w-w/2-1)

theorem probe_upper (a : Nat → Int) (key : Int) (f lo w : Nat) :
    probes a key f lo w ≤ f := by
  induction f generalizing lo w with
  | zero => simp [probes]
  | succ f ih =>
    simp only [probes]
    split
    · omega
    · split
      · omega
      · split
        · have h := ih lo (w/2); omega
        · have h := ih (lo+w/2+1) (w-w/2-1); omega

theorem probe_lower (f lo w : Nat) (small : w < 2^f) (hw : 0<w) :
    probes (fun _ => 0) (-1) f lo w = w.log2+1 := by
  induction f generalizing lo w with
  | zero => simp at small; omega
  | succ f ih =>
    rw [Nat.pow_succ] at small
    rw [probes,if_neg (by omega)]
    simp only [Int.reduceNeg, Int.reduceEq, ↓reduceIte, Int.reduceLT]
    by_cases one : w=1
    · subst w
      cases f <;> simp [probes,Nat.log2_def]
    · rw [ih lo (w/2) (by omega) (by omega),Nat.log2_def w,if_pos (by omega)]
      omega


-- The public solver sorts arbitrary input before searching the sorted array.
def lookup (xs : List Int) (i : Nat) := xs.toArray[i]?.getD 0

theorem lookup_in (xs : List Int) (i : Nat) (h : i < xs.length) : lookup xs i = xs[i] := by
  simp [lookup, List.getElem?_eq_getElem h]

def solve (xs : List Int) (x : Int) :=
  let ys := xs.mergeSort
  let arr := ys.toArray
  twoSum (fun i => arr[i]?.getD 0) arr.size x

theorem solve_correct (xs : List Int) (x : Int) :
    solve xs x = true ↔ ¬ xs.Pairwise (fun a b => a+b ≠ x) := by
  let ys := xs.mergeSort
  have p : ys.Perm xs := List.mergeSort_perm _ _
  have sorted : ys.Pairwise (· ≤ ·) := by
    have h := List.pairwise_mergeSort (le := fun a b : Int => decide (a≤b))
      (by simp; omega) (by simp; omega) xs
    simpa [ys] using h
  have hs : SortedOn (lookup ys) 0 ys.length := by
    intro i j _ hij hj
    simp at hj
    rw [lookup_in ys i (by omega),lookup_in ys j hj]
    by_cases eq : i=j
    · subst i; exact Int.le_refl _
    · exact List.pairwise_iff_getElem.mp sorted i j (by omega) hj (by omega)
  unfold solve
  simp only [List.size_toArray]
  change twoSum (lookup ys) ys.length x = true ↔ _
  rw [twoSum_ok _ _ _ hs, ← p.pairwise_iff (R := fun a b => a+b ≠ x) (by intros; omega)]
  rw [List.pairwise_iff_getElem]
  constructor
  · rintro ⟨i,j,hij,hj,eq⟩ no
    rw [lookup_in ys i (by omega),lookup_in ys j hj] at eq
    exact no i j (by omega) hj hij eq
  · intro h
    apply Classical.byContradiction
    intro missing
    apply h
    intro i j hi hj hij eq
    apply missing
    exact ⟨i,j,hij,hj,by simpa only [lookup_in ys i hi,lookup_in ys j hj] using eq⟩


#guard solve [9,-2,7,4] 5
#guard !solve [4] 8
#guard solve [4,4] 8
end ChapterTwoSearch
