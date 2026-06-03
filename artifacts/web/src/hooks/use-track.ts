import { useCallback } from "react";
import { trackEventObj } from "@/lib/analytics";

// Fires an event to the GTM/GA4 dataLayer.
// Use for click-to-call, click-to-text, and view events.
export function useTrack() {
  return useCallback(
    (eventType: string, eventData?: Record<string, any>) => {
      trackEventObj(eventType, eventData);
    },
    [],
  );
}
