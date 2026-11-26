import Std

set_option warningAsError true

namespace LeanLab

def sumFrom (acc : Int) : List Int → Int
  | [] => acc
  | x :: xs => sumFrom (acc + x) xs

def sumList (xs : List Int) : Int := sumFrom 0 xs

-- @lesson sum
theorem sumFrom_correct (acc : Int) (xs : List Int) :
    sumFrom acc xs = acc + xs.sum := by
  -- @step start
  induction xs generalizing acc with
  | nil =>
    -- @step nil
    simp [sumFrom, List.sum_nil, Int.add_zero]
    -- @step base
  | cons x xs ih =>
    -- @step cons
    change sumFrom (acc + x) xs = acc + (x + xs.sum)
    -- @step unfold
    rw [ih (acc + x)]
    -- @step use-ih
    exact Int.add_assoc acc x xs.sum
    -- @step assoc
-- @end

theorem sumList_correct (xs : List Int) : sumList xs = xs.sum := by
  rw [sumList, sumFrom_correct, Int.zero_add]

def linearSearch (key : Nat) : List Nat → Option Nat
  | [] => none
  | x :: xs => if x = key then some 0 else (linearSearch key xs).map Nat.succ

theorem linearSearch_sound (key : Nat) (xs : List Nat) (i : Nat)
    (found : linearSearch key xs = some i) : xs[i]? = some key := by
  induction xs generalizing i with
  | nil => simp [linearSearch] at found
  | cons x xs ih =>
    by_cases hx : x = key
    · subst x
      simp [linearSearch] at found
      subst i
      rfl
    · cases ht : linearSearch key xs with
      | none => simp [linearSearch, hx, ht] at found
      | some j =>
        simp [linearSearch, hx, ht] at found
        subst i
        exact ih j ht

-- @lesson search
theorem linearSearch_none_iff (key : Nat) (xs : List Nat) :
    linearSearch key xs = none ↔ key ∉ xs := by
  -- @step start
  induction xs with
  | nil =>
    -- @step nil
    simp [linearSearch]
    -- @step base
  | cons x xs ih =>
    -- @step cons
    by_cases hx : x = key
    -- @step cases
    · simp [linearSearch, hx]
      -- @step match
    · simpa [linearSearch, hx, Ne.symm hx] using ih
      -- @step next
-- @end

end LeanLab

#print axioms LeanLab.sumList_correct
#print axioms LeanLab.sumFrom_correct
#print axioms LeanLab.linearSearch_sound
#print axioms LeanLab.linearSearch_none_iff
