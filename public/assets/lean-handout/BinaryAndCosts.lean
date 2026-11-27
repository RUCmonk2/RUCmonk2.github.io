import Std
set_option warningAsError true
namespace ChapterTwo

-- 2.1-5. Each column has one bit from each equal-width input, low column first.
def value : List Bool → Nat
  | [] => 0
  | b :: bs => b.toNat + 2 * value bs

def bitSum (a b c : Bool) := xor (xor a b) c
def carry (a b c : Bool) := (a && b) || (a && c) || (b && c)

theorem column (a b c : Bool) :
    (bitSum a b c).toNat + 2 * (carry a b c).toNat = a.toNat + b.toNat + c.toNat := by
  cases a <;> cases b <;> cases c <;> decide

def addBits : List (Bool × Bool) → Bool → List Bool
  | [], c => [c]
  | (a,b) :: xs, c => bitSum a b c :: addBits xs (carry a b c)

theorem addBits_correct (xs : List (Bool × Bool)) (c : Bool) :
    value (addBits xs c) = value (xs.map Prod.fst) + value (xs.map Prod.snd) + c.toNat := by
  induction xs generalizing c with
  | nil => simp [addBits, value]
  | cons p xs ih =>
    obtain ⟨a,b⟩ := p
    simp only [List.map_cons, addBits, value, ih]
    have h := column a b c
    omega

theorem addBits_width (xs : List (Bool × Bool)) (c : Bool) :
    (addBits xs c).length = xs.length + 1 := by
  induction xs generalizing c with
  | nil => rfl
  | cons p xs ih => simp [addBits, ih]

-- 2.2-1. Scale the polynomial by 1000 to keep arithmetic exact.
def scaled (n : Int) := n^3 + 100000*n^2 - 100000*n + 3000

theorem cubic (n : Int) (hn : 1 ≤ n) :
    n^3 ≤ scaled n ∧ scaled n ≤ 103001*n^3 := by
  have h₂ : n ≤ n^2 := by
    simpa [Int.pow_succ] using Int.mul_le_mul_of_nonneg_left hn (show 0 ≤ n by omega)
  have h₃ : n^2 ≤ n^3 := by
    simpa only [Int.mul_one, Int.pow_succ n 2] using Int.mul_le_mul_of_nonneg_left hn (show 0 ≤ n^2 by omega)
  unfold scaled
  omega

-- The triangular count is used for 2.2-2, 2.2-3, 2.3-5/7 and Problems 2-2/3/4.
def tri : Nat → Nat
  | 0 => 0
  | n+1 => tri n + n

theorem twice_tri (n : Nat) : 2 * tri n + n = n*n := by
  induction n with
  | zero => rfl
  | succ n ih => simp only [tri]; grind

-- 2.2-3. Total comparisons over n equiprobable successful positions.
def totalProbes : Nat → Nat
  | 0 => 0
  | n+1 => totalProbes n + (n+1)

theorem successful_sum (n : Nat) : 2 * totalProbes n = n*(n+1) := by
  induction n with
  | zero => rfl
  | succ n ih => simp only [totalProbes]; grind

-- 2.2-4. A linear adjacent-order scan; the fallback comes with a sort specification.
def ordered : List Nat → Bool
  | a :: b :: xs => decide (a ≤ b) && ordered (b :: xs)
  | _ => true

theorem ordered_spec (xs : List Nat) : ordered xs = true ↔ xs.Pairwise (· ≤ ·) := by
  induction xs using ordered.induct with
  | case1 a b xs ih =>
    simp only [ordered, Bool.and_eq_true, decide_eq_true_eq, ih]
    constructor
    · rintro ⟨hab, h⟩
      apply List.pairwise_cons.mpr
      refine ⟨?_, h⟩
      intro z hz
      rcases List.mem_cons.mp hz with rfl | hz
      · exact hab
      · exact Nat.le_trans hab ((List.pairwise_cons.mp h).1 z hz)
    · intro h
      exact ⟨(List.pairwise_cons.mp h).1 b (by simp), (List.pairwise_cons.mp h).2⟩
  | case2 xs h => cases xs with
                  | nil => simp [ordered]
                  | cons a ys => cases ys <;> simp_all [ordered]

def guarded (sort : List Nat → List Nat) (xs : List Nat) :=
  if ordered xs then xs else sort xs

theorem guarded_spec (sort : List Nat → List Nat)
    (ok : ∀ l, (sort l).Pairwise (· ≤ ·) ∧ (sort l).Perm l) (xs : List Nat) :
    (guarded sort xs).Pairwise (· ≤ ·) ∧ (guarded sort xs).Perm xs := by
  unfold guarded
  split
  next h => exact ⟨(ordered_spec xs).mp h, .refl _⟩
  next => exact ok xs

-- 2.3-2. Inclusive interval midpoint and the strict decrease of both child widths.
theorem split_bounds (p r : Nat) (h : p < r) :
    p ≤ (p+r)/2 ∧ (p+r)/2 < r ∧ (p+r)/2-p < r-p ∧ r-((p+r)/2+1) < r-p := by omega

-- 2.3-4. Height h represents n = 2^(h+1); base n=2.
def mergeCost : Nat → Nat
  | 0 => 2
  | h+1 => 2 * mergeCost h + 2^(h+2)

theorem mergeCost_exact (h : Nat) : mergeCost h = 2^(h+1)*(h+1) := by
  induction h with
  | zero => rfl
  | succ h ih => simp only [mergeCost, ih, Nat.pow_succ]; grind

-- 2.3-6. One probe and then the largest remaining half, counted exactly.
def depth (n : Nat) : Nat :=
  if n = 0 then 0 else 1 + depth (n/2)
termination_by n
decreasing_by omega

theorem depth_exact (n : Nat) (pos : 0 < n) : depth n = n.log2 + 1 := by
  induction n using Nat.strongRecOn with
  | ind n ih =>
    rw [depth, if_neg (by omega)]
    by_cases h : n = 1
    · subst n; simp [depth,Nat.log2_def]
    · rw [ih (n/2) (by omega) (by omega)]
      rw [Nat.log2_def n]
      simp only [if_pos (show 2 ≤ n by omega)]
      omega

-- 2-1. b blocks of width k. Every merge level has bk items.
theorem leaf_work (b k : Nat) : b*(k*k) = (b*k)*k := by grind

def mergeLevels (n : Nat) : Nat → Nat
  | 0 => 0
  | h+1 => mergeLevels n h + n

theorem layer_work (n h : Nat) : mergeLevels n h = n*h := by
  induction h with
  | zero => simp [mergeLevels]
  | succ h ih => simp [mergeLevels, ih, Nat.mul_succ]

-- n = 2^h blocks times k=2^j, so log₂ n = h+j.
theorem cutoff_lower (h j : Nat) : h+j ≤ 2^j+h := by
  have : j < 2^j := Nat.lt_two_pow_self
  omega

theorem cutoff_upper (h j c : Nat) (hk : 2^j ≤ c*(h+j)) :
    2^j+h ≤ (c+1)*(h+j) := by grind

-- Exact counts imply a quadratic sandwich already at n=2.
theorem triangular_bounds (n : Nat) (big : 2 ≤ n) :
    n*n ≤ 4*tri n ∧ 2*tri n ≤ n*n := by
  have id := twice_tri n
  have lo : 2*n ≤ n*n := Nat.mul_le_mul_right n big
  omega

-- A concrete cost model can prefer different cutoffs on different machines.
def model (a b n k h : Nat) := a*n*k + b*n*h
example : model 1 10 64 8 3 < model 1 10 64 4 4 := by decide
example : model 10 1 64 4 4 < model 10 1 64 8 3 := by decide

example : addBits [(true,true),(false,true),(true,true),(true,false)] false =
    [false,false,true,false,true] := by decide

end ChapterTwo
