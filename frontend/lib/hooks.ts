import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR and the first (hydration) render, then true on the
 * client. Hydration-safe and avoids calling setState inside an effect, so it's
 * the right guard before reading client-only APIs like localStorage.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
