export const DWELL_MS = 800;

type Schedule = (callback: () => void, delay: number) => () => void;
const scheduleTimeout: Schedule = (callback, delay) => {
  const timer = setTimeout(callback, delay);
  return () => clearTimeout(timer);
};

// One pending target at a time. Leaving, navigating or unmounting invalidates
// even a callback already queued by the browser, so it cannot steal focus.
export function createDwellFocus(
  commit: (id: string) => void,
  pending: (id: string | null) => void,
  schedule: Schedule = scheduleTimeout,
) {
  let candidate: string | null = null;
  let clear: (() => void) | undefined;
  let generation = 0;
  function cancel(notify = true) {
    generation++;
    clear?.();
    clear = undefined;
    candidate = null;
    if (notify) pending(null);
  }
  return {
    enter(id: string) {
      if (id === candidate) return;
      cancel();
      candidate = id;
      const current = generation;
      pending(id);
      clear = schedule(() => {
        if (current !== generation || candidate !== id) return;
        cancel();
        commit(id);
      }, DWELL_MS);
    },
    cancel: () => cancel(),
    dispose: () => cancel(false),
  };
}
