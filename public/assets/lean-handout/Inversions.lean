import Std
set_option warningAsError true
namespace Inversions
abbrev smaller (x : Nat) (r : List Nat) := r.countP (fun y => y < x)
abbrev larger (x : Nat) (l : List Nat) := l.countP (fun y => x < y)
def cross (l r : List Nat) := (l.map (fun x => smaller x r)).sum

def inv : List Nat → Nat
  | [] => 0
  | x::xs => smaller x xs + inv xs

theorem inv_append (l r : List Nat) : inv (l++r) = inv l + inv r + cross l r := by
  induction l with
  | nil => simp [inv,cross]
  | cons a l ih => simp [inv,ih,cross,smaller]; omega

theorem cross_right (l : List Nat) (y : Nat) (r : List Nat) :
    cross l (y::r) = larger y l + cross l r := by
  induction l with
  | nil => simp [cross,larger]
  | cons x l ih =>
    simp only [cross, List.map_cons, List.sum_cons, smaller, larger, List.countP_cons] at *
    grind

theorem cross_perm (l L r R : List Nat) (p : L.Perm l) (q : R.Perm r) :
    cross L R = cross l r := by
  have f : (fun x => smaller x R) = (fun x => smaller x r) :=
    funext fun x => q.countP_eq _
  unfold cross
  rw [f]
  exact (p.map _).sum_nat

-- 2-4b: sum of available pairs and a decreasing input attaining the bound.
def pairs : Nat → Nat
  | 0 => 0
  | n+1 => n+pairs n

theorem max_bound (l : List Nat) : inv l ≤ pairs l.length := by
  induction l with
  | nil => decide
  | cons x xs ih => simpa [inv,pairs] using Nat.add_le_add (List.countP_le_length (p := fun y => decide (y<x))) ih

theorem decreasing_max (n : Nat) : inv ((List.range n).reverse) = pairs n := by
  induction n with
  | zero => rfl
  | succ n ih =>
    rw [List.range_succ, List.reverse_append]
    simp only [List.reverse_cons, List.reverse_nil, List.nil_append, List.cons_append, inv, pairs, ih]
    have h : smaller n (List.range n).reverse = n := by
      calc
        _ = (List.range n).reverse.length := List.countP_eq_length.mpr (by simp)
        _ = n := by simp
    rw [h]

-- 2.3-5, 2.3-7, 2-4c. Store the processed sorted prefix in reverse order.
def insertRev (x : Nat) : List Nat → List Nat
  | [] => [x]
  | y::ys => if x<y then y::insertRev x ys else x::y::ys

def recursiveSortRev : List Nat → List Nat
  | [] => []
  | x::previous => insertRev x (recursiveSortRev previous)

def shifts (x : Nat) : List Nat → Nat
  | [] => 0
  | y::ys => if x<y then 1+shifts x ys else 0

theorem shift_count (x : Nat) (l : List Nat) (hs : l.Pairwise (· ≥ ·)) :
    shifts x l = larger x l := by
  induction l with
  | nil => rfl
  | cons y ys ih =>
    obtain ⟨head,tail⟩ := List.pairwise_cons.mp hs
    by_cases h : x<y
    · simp [shifts,h,ih tail,larger,Nat.add_comm]
    · have none : larger x ys = 0 := List.countP_eq_zero.mpr (by
        intro z hz; have := head z hz; simp; omega)
      simpa [shifts,h,larger,List.countP_cons] using none.symm

@[simp] theorem zero_cross (l : List Nat) : cross l [] = 0 := by
  induction l with
  | nil => rfl
  | cons x xs ih => simpa [cross,smaller] using ih

theorem append_one (l : List Nat) (x : Nat) : inv (l++[x]) = inv l + larger x l := by
  rw [inv_append,cross_right]
  simp [inv,smaller]

-- Count only cross-run inversions. n is the cached remaining left length.
def scan (n : Nat) : List Nat → List Nat → Nat
  | [], _ => 0
  | _, [] => 0
  | x::xs, y::ys => if x ≤ y then scan (n-1) xs (y::ys) else n + scan n (x::xs) ys

theorem scan_ok (l r : List Nat) (hl : l.Pairwise (· ≤ ·)) (hr : r.Pairwise (· ≤ ·)) :
    scan l.length l r = cross l r := by
  induction l generalizing r with
  | nil => simp [scan,cross]
  | cons x xs ih =>
    obtain ⟨hx,ht⟩ := List.pairwise_cons.mp hl
    induction r with
    | nil => simp [scan]
    | cons y ys jr =>
      by_cases h : x ≤ y
      · have zero : smaller x (y::ys) = 0 := List.countP_eq_zero.mpr (by
          intro z hz
          rcases List.mem_cons.mp hz with rfl | hz
          · simp; omega
          · have := (List.pairwise_cons.mp hr).1 z hz; simp; omega)
        rw [scan, if_pos h]
        simpa [cross,zero] using ih (y::ys) ht hr
      · have allLarge : larger y (x::xs) = (x::xs).length := List.countP_eq_length.mpr (by
          intro z hz
          rcases List.mem_cons.mp hz with rfl | hz
          · simp; omega
          · have := hx z hz; simp; omega)
        rw [scan,if_neg h,cross_right,allLarge,jr (List.pairwise_cons.mp hr).2]

abbrev merge (l r : List Nat) := l.merge r (fun a b => decide (a≤b))
def counted : Nat → List Nat → List Nat × Nat
  | 0, xs => (xs,0)
  | k+1, xs =>
    if xs.length ≤ 1 then (xs,0) else
    let mid := xs.length / 2
    let (l,a) := counted k (xs.take mid)
    let (r,b) := counted k (xs.drop mid)
    (merge l r, a+b+scan mid l r)

theorem counted_ok (k : Nat) (xs : List Nat) (enough : xs.length ≤ k+1) :
    (counted k xs).1.Perm xs ∧ (counted k xs).1.Pairwise (· ≤ ·) ∧ (counted k xs).2 = inv xs := by
  induction k generalizing xs with
  | zero =>
    cases xs with
    | nil => simp [counted,inv]
    | cons a xs => cases xs <;> simp_all [counted,inv,smaller]
  | succ k ih =>
    by_cases short : xs.length ≤ 1
    · cases xs with
      | nil => simp [counted,inv]
      | cons a ys => cases ys <;> simp_all [counted,inv,smaller]
    let mid := xs.length / 2
    let l := xs.take mid
    let r := xs.drop mid
    have cat : l++r = xs := List.take_append_drop ..
    have len : l.length = mid := by simp [l,mid]; omega
    obtain ⟨lp,ls,lc⟩ := ih l (by rw [len]; dsimp [mid]; omega)
    obtain ⟨rp,rs,rc⟩ := ih r (by simp [r,mid]; omega)
    rw [counted,if_neg short]
    let L := (counted k l).1
    let R := (counted k r).1
    change (merge L R).Perm xs ∧ (merge L R).Pairwise (· ≤ ·) ∧
      (counted k l).2 + (counted k r).2 + scan mid L R = inv xs
    refine ⟨cat ▸ (List.merge_perm_append _).trans (lp.append rp),?_,?_⟩
    · have h := List.pairwise_merge (le := fun a b : Nat => decide (a≤b))
          (by simp; omega) (by simp; omega) L R (by simpa [L] using ls) (by simpa [R] using rs)
      simpa using h
    · have hlen : L.length = mid := lp.length_eq.trans len
      rw [lc,rc,← hlen,scan_ok _ _ ls rs,cross_perm l L r R lp rp,← inv_append,cat]

example : inv [2,3,8,6,1] = 5 := by decide
theorem insert_perm (x : Nat) (l : List Nat) : (insertRev x l).Perm (x::l) := by
  induction l with
  | nil => exact .refl _
  | cons y ys ih =>
    by_cases h : x<y
    · rw [insertRev,if_pos h]
      exact (ih.cons y).trans (.swap x y ys)
    · rw [insertRev,if_neg h]

theorem insert_desc (x : Nat) (l : List Nat) (hs : l.Pairwise (· ≥ ·)) :
    (insertRev x l).Pairwise (· ≥ ·) := by
  induction l with
  | nil => simp [insertRev]
  | cons y ys ih =>
    obtain ⟨head,tail⟩ := List.pairwise_cons.mp hs
    by_cases h : x<y
    · rw [insertRev,if_pos h,List.pairwise_cons]
      refine ⟨?_,ih tail⟩
      intro z hz
      rcases List.mem_cons.mp ((insert_perm x ys).mem_iff.mp hz) with rfl | hz
      · omega
      · exact head z hz
    · rw [insertRev,if_neg h,List.pairwise_cons]
      refine ⟨?_,hs⟩
      intro z hz
      rcases List.mem_cons.mp hz with rfl | hz
      · omega
      · have := head z hz; omega

theorem prefix_ok (rev : List Nat) :
    (recursiveSortRev rev).Perm rev ∧ (recursiveSortRev rev).Pairwise (· ≥ ·) := by
  induction rev with
  | nil => simp [recursiveSortRev]
  | cons x xs ih =>
    exact ⟨(insert_perm x _).trans (ih.1.cons x),insert_desc x _ ih.2⟩

def totalShifts : List Nat → Nat
  | [] => 0
  | x::rev => totalShifts rev + shifts x (recursiveSortRev rev)

theorem shifts_are_inversions (rev : List Nat) : totalShifts rev = inv rev.reverse := by
  induction rev with
  | nil => rfl
  | cons x rev ih =>
    rw [totalShifts,List.reverse_cons,append_one,ih,shift_count x _ (prefix_ok rev).2]
    have perm := (prefix_ok rev).1.trans (List.reverse_perm (l := rev)).symm
    rw [larger,perm.countP_eq]

theorem pairs_exact (n : Nat) : 2*pairs n+n = n*n := by
  induction n with
  | zero => rfl
  | succ n ih => simp only [pairs]; grind


def badPositions (xs : List Nat) : List (Nat × Nat) :=
  (List.range xs.length).flatMap fun i =>
    ((List.range xs.length).filter fun j => i<j && xs[i]! > xs[j]!).map fun j => (i+1,j+1)

example : badPositions [2,3,8,6,1] = [(1,5),(2,5),(3,4),(3,5),(4,5)] := by decide
#guard (counted 5 [2,3,8,6,1]).2 == 5
end Inversions
