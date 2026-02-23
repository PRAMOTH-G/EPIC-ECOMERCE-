/**
 * useHaptic – Vibration feedback for mobile devices
 * Uses the Vibration API (supported on Android Chrome; no-op on iOS/desktop)
 */
export function useHaptic() {
    const vibrate = (pattern = [30]) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    return {
        tap: () => vibrate([15]),
        success: () => vibrate([30, 50, 30]),
        error: () => vibrate([100, 30, 100]),
        addToCart: () => vibrate([20, 40, 60]),
        remove: () => vibrate([80]),
    };
}
