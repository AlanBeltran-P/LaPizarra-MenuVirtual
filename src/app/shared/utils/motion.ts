/** true si el usuario pidió reducir animaciones en su dispositivo. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
