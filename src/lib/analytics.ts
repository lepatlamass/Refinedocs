/**
 * Open-source analytics stub:
 * Zero telemetry, zero external tracking, zero cookies.
 */

export const initAnalytics = async () => null;
export const disableAnalytics = () => {};
export const trackEvent = (_eventName: string, _params?: Record<string, any>) => {};
export const trackPageView = (_path: string) => {};
export const trackToolUsed = (_toolId: string) => {};
export const trackToolCompleted = (_toolId: string) => {};
export const trackFileDownloaded = (_toolId: string) => {};
export const trackSignUp = () => {};
export const trackLogin = () => {};
export const trackSubscriptionStarted = () => {};
