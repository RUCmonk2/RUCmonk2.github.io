"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createDwellFocus } from "./dwell";

export function useDwellFocus(commit: (id: string) => void) {
  const latestCommit = useRef(commit);
  const controller = useRef<ReturnType<typeof createDwellFocus> | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  useEffect(() => {
    latestCommit.current = commit;
  }, [commit]);
  useEffect(() => {
    const dwell = createDwellFocus(
      (id) => latestCommit.current(id),
      setPending,
    );
    controller.current = dwell;
    return () => {
      dwell.dispose();
      controller.current = null;
    };
  }, []);
  const queue = useCallback((id: string) => controller.current?.enter(id), []);
  const cancel = useCallback(() => controller.current?.cancel(), []);
  return { pending, queue, cancel };
}
