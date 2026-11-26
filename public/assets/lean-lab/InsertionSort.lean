import Std

set_option warningAsError true

namespace LeanLab

variable (r : Nat → Nat → Prop) [DecidableRel r]

def insert (x : Nat) : List Nat → List Nat
  | [] => [x]
  | y :: ys => if r x y then x :: y :: ys else y :: insert x ys

def sortFrom (acc : List Nat) : List Nat → List Nat
  | [] => acc
  | x :: xs => sortFrom (insert r x acc) xs

def insertionSort (xs : List Nat) : List Nat :=
  sortFrom r [] xs

theorem insert_perm (x : Nat) (ys : List Nat) :
    (insert r x ys).Perm (x :: ys) := by
  induction ys with
  | nil => exact .refl _
  | cons y ys ih =>
    by_cases h : r x y
    · rw [insert, if_pos h]
    · rw [insert, if_neg h]
      exact (List.Perm.cons y ih).trans (.swap x y ys)

theorem insert_ordered
    (trans : ∀ {x y z}, r x y → r y z → r x z)
    (total : ∀ x y, r x y ∨ r y x)
    (x : Nat) (ys : List Nat) (hs : ys.Pairwise r) :
    (insert r x ys).Pairwise r := by
  induction ys with
  | nil => simp [insert]
  | cons y ys ih =>
    obtain ⟨hy, hys⟩ := List.pairwise_cons.mp hs
    by_cases hxy : r x y
    · rw [insert, if_pos hxy, List.pairwise_cons]
      refine ⟨?_, hs⟩
      intro z hz
      rcases List.mem_cons.mp hz with rfl | hz
      · exact hxy
      · exact trans hxy (hy z hz)
    · rw [insert, if_neg hxy, List.pairwise_cons]
      refine ⟨?_, ih hys⟩
      intro z hz
      have hz' := (insert_perm r x ys).mem_iff.mp hz
      rcases List.mem_cons.mp hz' with hzEq | hzTail
      · subst z
        exact (total x y).resolve_left hxy
      · exact hy z hzTail

-- @lesson insertion-order
theorem sortFrom_ordered
    (trans : ∀ {x y z}, r x y → r y z → r x z)
    (total : ∀ x y, r x y ∨ r y x)
    (rest acc : List Nat) (hAcc : acc.Pairwise r) :
    (sortFrom r acc rest).Pairwise r := by
  -- @step start
  induction rest generalizing acc with
  | nil =>
    -- @step nil
    exact hAcc
    -- @step base
  | cons x xs ih =>
    -- @step cons
    have hStep : (insert r x acc).Pairwise r :=
      insert_ordered r trans total x acc hAcc
    -- @step preserve
    exact ih (insert r x acc) hStep
    -- @step finish
-- @end

theorem sortFrom_perm (rest acc : List Nat) :
    (sortFrom r acc rest).Perm (acc ++ rest) := by
  induction rest generalizing acc with
  | nil => simp [sortFrom]
  | cons x xs ih =>
    have h := ih (insert r x acc)
    exact h.trans (((insert_perm r x acc).append_right xs).trans
      (List.perm_middle (a := x) (l₁ := acc) (l₂ := xs)).symm)

-- @lesson insertion-spec
theorem insertionSort_correct
    (trans : ∀ {x y z}, r x y → r y z → r x z)
    (total : ∀ x y, r x y ∨ r y x) (xs : List Nat) :
    (insertionSort r xs).Pairwise r ∧ (insertionSort r xs).Perm xs := by
  -- @step start
  constructor
  -- @step split
  · exact sortFrom_ordered r trans total xs [] .nil
    -- @step sorted
  · exact sortFrom_perm r xs []
    -- @step perm
-- @end

-- @lesson descending
theorem descending_correct (xs : List Nat) :
    (insertionSort (fun x y => y ≤ x) xs).Pairwise (fun x y => y ≤ x) ∧
      (insertionSort (fun x y => y ≤ x) xs).Perm xs := by
  -- @step start
  apply insertionSort_correct
  -- @step apply
  · intro x y z hyx hzy
    -- @step trans-assume
    exact Nat.le_trans hzy hyx
    -- @step trans
  · intro x y
    -- @step total-assume
    exact Nat.le_total y x
    -- @step total
-- @end

-- States of the outer loop, including the initial empty accumulator.
def insertionTraceFrom (acc : List Nat) : List Nat → List (List Nat)
  | [] => [acc]
  | x :: xs => acc :: insertionTraceFrom (insert (· ≤ ·) x acc) xs

def insertionTrace (xs : List Nat) : List (List Nat) := insertionTraceFrom [] xs

-- @sample mixed
#eval insertionTrace [4, 2, 5, 2, 1]
-- @sample reversed
#eval insertionTrace [5, 4, 3, 2, 1]
-- @sample empty
#eval insertionTrace []

end LeanLab

#print axioms LeanLab.sortFrom_ordered
#print axioms LeanLab.insertionSort_correct
#print axioms LeanLab.descending_correct
