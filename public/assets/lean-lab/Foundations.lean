import Std

set_option warningAsError true

namespace LeanLab

-- @lesson propositions
theorem swapAnd (P Q : Prop) : P ∧ Q → Q ∧ P := by
  -- @step start
  intro h
  -- @step intro
  constructor
  -- @step constructor
  · exact h.right
    -- @step right
  · exact h.left
    -- @step left
-- @end

-- @lesson rewrite
theorem addOneEq (a b : Nat) (h : a = b) : a + 1 = b + 1 := by
  -- @step start
  rw [h]
  -- @step rewrite
-- @end

-- @lesson induction
theorem appendNil (xs : List Nat) : xs ++ [] = xs := by
  -- @step start
  induction xs with
  | nil =>
    -- @step nil
    rfl
    -- @step base
  | cons x rest ih =>
    -- @step cons
    change x :: (rest ++ []) = x :: rest
    -- @step unfold
    rw [ih]
    -- @step rewrite
-- @end

end LeanLab

#print axioms LeanLab.swapAnd
#print axioms LeanLab.addOneEq
#print axioms LeanLab.appendNil
