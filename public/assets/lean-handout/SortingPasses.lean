import Std
set_option warningAsError true
namespace SortingPasses
abbrev Pass := Nat → List Nat → Nat × List Nat
def Valid (pass : Pass) := ∀ a xs,
  let (m,ys) := pass a xs
  (m::ys).Perm (a::xs) ∧ ∀ z ∈ ys, m ≤ z

-- 2.2-2. Replace the first occurrence of m by the displaced initial element.
def replaceFirst (m a : Nat) : List Nat → List Nat
  | [] => []
  | x::xs => if x=m then a::xs else x::replaceFirst m a xs

theorem exchange (a m : Nat) (xs : List Nat) (h : m ∈ xs) :
    (m::replaceFirst m a xs).Perm (a::xs) := by
  induction xs with
  | nil => simp at h
  | cons x xs ih =>
    by_cases eq : x=m
    · subst x; simp [replaceFirst]; exact .swap a m xs
    · rw [replaceFirst, if_neg eq]
      have tail := ih ((List.mem_cons.mp h).resolve_left (Ne.symm eq))
      exact (.swap x m _ : (m::x::_).Perm (x::m::_)) |>.trans
        ((tail.cons x).trans (.swap a x xs))

def select : Pass := fun a xs =>
  let m := (a::xs).min (by simp)
  if m = a then (a,xs) else (m,replaceFirst m a xs)

theorem select_valid : Valid select := by
  intro a xs
  let m := (a::xs).min (by simp)
  have hm : (a::xs).min? = some m := List.min?_eq_some_min (by simp)
  obtain ⟨hmIn, low⟩ := List.min?_eq_some_iff.mp hm
  change (if m = a then _ else _)
    |> fun (p : Nat × List Nat) => (p.1::p.2).Perm (a::xs) ∧ ∀ z ∈ p.2, p.1 ≤ z
  by_cases eq : m=a
  · simp only [if_pos eq]
    exact ⟨.refl _,fun z hz => eq ▸ low z (by simp [hz])⟩
  · simp only [if_neg eq]
    have perm := exchange a m xs ((List.mem_cons.mp hmIn).resolve_left eq)
    exact ⟨perm,fun z hz => low z (perm.mem_iff.mp (List.mem_cons_of_mem _ hz))⟩

-- Problem 2-2. Evaluate the suffix first, then compare adjacent elements.
def bubble (a : Nat) : List Nat → Nat × List Nat
  | [] => (a,[])
  | b::xs =>
    let (m,ys) := bubble b xs
    if m<a then (m,a::ys) else (a,m::ys)

theorem bubble_valid : Valid bubble := by
  intro a xs
  induction xs generalizing a with
  | nil => exact ⟨.refl _,by simp⟩
  | cons b xs ih =>
    obtain ⟨m,ys,e⟩ : ∃ m ys, bubble b xs = (m,ys) := ⟨_,_,rfl⟩
    have h := ih b
    rw [e] at h
    obtain ⟨hp,lo⟩ := h
    simp only [bubble,e]
    split
    next lt =>
      exact ⟨(List.Perm.swap a m ys).trans (hp.cons a),fun z hz => by
        rcases List.mem_cons.mp hz with rfl | hz
        · omega
        · exact lo z hz⟩
    next ge =>
      exact ⟨hp.cons a,fun z hz => by
        rcases List.mem_cons.mp hz with rfl | hz
        · omega
        · exact Nat.le_trans (by omega) (lo z hz)⟩

def rounds (pass : Pass) : Nat → List Nat → List Nat
  | 0, xs => xs
  | _+1, [] => []
  | k+1, a::xs => let (m,ys) := pass a xs; m::rounds pass k ys

theorem rounds_ok (pass : Pass) (valid : Valid pass) (k : Nat) (xs : List Nat)
    (enough : xs.length ≤ k+1) :
    (rounds pass k xs).Pairwise (· ≤ ·) ∧ (rounds pass k xs).Perm xs := by
  induction k generalizing xs with
  | zero =>
    cases xs with
    | nil => simp [rounds]
    | cons a xs => cases xs <;> simp_all [rounds]
  | succ k ih =>
    cases xs with
    | nil => simp [rounds]
    | cons a xs =>
      obtain ⟨m,ys,e⟩ : ∃ m ys, pass a xs = (m,ys) := ⟨_,_,rfl⟩
      have h := valid a xs
      rw [e] at h
      obtain ⟨hp,lo⟩ := h
      have len := hp.length_eq
      obtain ⟨hs,perm⟩ := ih ys (by simp at len enough; omega)
      simp only [rounds,e,List.pairwise_cons]
      exact ⟨⟨fun z hz => lo z (perm.mem_iff.mp hz),hs⟩,(perm.cons m).trans hp⟩

example : rounds select 3 [4,2,1,3] = [1,2,3,4] := by decide
example : rounds bubble 3 [4,2,1,3] = [1,2,3,4] := by decide
end SortingPasses
