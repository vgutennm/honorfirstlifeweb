export const trackEventObj = (
  eventType: string,
  eventData?: Record<string, any>
) => {
  // Push to GTM/GA4 dataLayer
  if (typeof window !== "undefined") {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: eventType,
      ...eventData,
    });
  }
};
