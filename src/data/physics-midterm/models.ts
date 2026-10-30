export type CapacitorMode = "voltage" | "charge";

/** Relative to one common initial state; each mode fixes its initial U or Q. */
export function capacitorState(mode: CapacitorMode, distanceRatio: number) {
  const capacitance = 1 / distanceRatio;
  const voltage = mode === "voltage" ? 1 : distanceRatio;
  const charge = capacitance * voltage;
  return {
    capacitance,
    voltage,
    charge,
    field: voltage / distanceRatio,
  };
}

export const particleModel = {
  plateLength: 0.2,
  plateGap: 0.1,
  chargeMassRatio: 5e7,
};

/** y is upward; voltage is top potential minus bottom potential. */
export function particleState(
  chargeSign: number,
  voltage: number,
  speed: number,
) {
  const { plateLength, plateGap, chargeMassRatio } = particleModel;
  const acceleration = (-chargeSign * chargeMassRatio * voltage) / plateGap;
  const exitTime = plateLength / speed;
  const freeExitY = (acceleration * exitTime ** 2) / 2;
  const hitsPlate = Math.abs(freeExitY) >= (plateGap / 2) * (1 - 1e-12);
  const time = hitsPlate
    ? Math.sqrt(plateGap / Math.abs(acceleration))
    : exitTime;
  const x = speed * time;
  const y = (acceleration * time ** 2) / 2;
  return {
    acceleration,
    exitTime,
    freeExitY,
    hitsPlate,
    time,
    x,
    y,
    verticalSpeed: acceleration * time,
  };
}
