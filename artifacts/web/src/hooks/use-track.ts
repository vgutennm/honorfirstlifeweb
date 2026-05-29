import { useCallback } from "react";
import { useTrackEvent } from "@workspace/api-client-react";
import { trackEventObj } from "@/lib/analytics";

// Fires an event to both the GTM/GA4 dataLayer and the backend events endpoint.
// Use for click-to-call, click-to-text, form, and view events.
export function useTrack() {
  const trackEventApi = useTrackEvent();

  return useCallback(
    (eventType: string, eventData?: Record<string, any>) => {
      trackEventObj(eventType, eventData);
      trackEventApi.mutate({
        data: {
          eventType,
          ...(eventData ? { eventData: JSON.stringify(eventData) } : {}),
        },
      });
    },
    [trackEventApi],
  );
}
