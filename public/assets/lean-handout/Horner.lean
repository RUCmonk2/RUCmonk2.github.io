import Std
set_option warningAsError true
namespace HornerLesson

-- Coefficients in increasing degree. Evaluate the tail before the head.
def horner (x : Int) : List Int → Int
  | [] => 0
  | a::as => a + x * horner x as

-- Direct specification; each coefficient carries its original exponent.
def powersFrom (x : Int) (k : Nat) : List Int → Int
  | [] => 0
  | a::as => a*x^k + powersFrom x (k+1) as

theorem suffix (x : Int) (k : Nat) (as : List Int) :
    powersFrom x k as = x^k * horner x as := by
  induction as generalizing k with
  | nil => simp [powersFrom,horner]
  | cons a as ih =>
    rw [powersFrom,horner,ih (k+1),Int.pow_succ]
    grind

theorem horner_correct (x : Int) (as : List Int) :
    powersFrom x 0 as = horner x as := by
  simpa using suffix x 0 as

def mulPower (x : Int) : Nat → Int
  | 0 => 1
  | k+1 => mulPower x k * x

theorem power_ok (x : Int) (k : Nat) : mulPower x k = x^k := by
  induction k with
  | zero => simp [mulPower]
  | succ k ih => rw [mulPower, ih, Int.pow_succ]

def naiveMultiplications : Nat → Nat
  | 0 => 0
  | k+1 => naiveMultiplications k + k + 1

theorem naive_work (m : Nat) : 2 * naiveMultiplications m = m*(m+1) := by
  induction m with
  | zero => rfl
  | succ m ih => simp only [naiveMultiplications]; grind

example : horner 2 [3,-1,2,4] = 41 := by decide
end HornerLesson
