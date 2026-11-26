import Std

set_option warningAsError true

namespace HandoutPractice

-- 第 2 页：观察输出
#check (3 : Nat)
#eval (2 + 3 : Nat)
#check (2 + 3 = 5)
example : (2 + 3 : Nat) = 5 := by rfl

-- 第 4、5 页：构造、取出与代入
example (P Q : Prop) (h : P ∧ Q) : Q ∧ P := by
  exact ⟨h.right, h.left⟩

example (P Q R : Prop) (h : P ∧ (Q ∧ R)) : R ∧ P := by
  constructor
  · exact h.right.right
  · exact h.left

example (a b : Nat) (h : a = b) (ha : a = 3) : b = 3 := by
  rw [← h]
  exact ha

-- 第 6、7 页：拼接的两个方向
example (xs : List Nat) : [] ++ xs = xs := by rfl

theorem appendNil (xs : List Nat) : xs ++ [] = xs := by
  induction xs with
  | nil => rfl
  | cons x rest ih =>
    change x :: (rest ++ []) = x :: rest
    rw [ih]

-- 第 19、20 页：先自己写一遍，再对照这些解答
example (P Q R : Prop) (h : (P ∧ Q) ∧ R) : R ∧ Q := by
  constructor
  · exact h.right
  · exact h.left.right

example (a b : Nat) (h : a = b) (ha : a + 1 = 9) :
    b + 1 = 9 := by
  rw [h] at ha
  exact ha

def countItems : List Nat → Nat
  | [] => 0
  | _ :: xs => countItems xs + 1

example (xs : List Nat) : countItems (xs ++ []) = countItems xs := by
  rw [appendNil xs]

example (xs : List Nat) : countItems (xs ++ []) = countItems xs := by
  induction xs with
  | nil => rfl
  | cons x rest ih =>
    change countItems (rest ++ []) + 1 = countItems rest + 1
    rw [ih]

end HandoutPractice
