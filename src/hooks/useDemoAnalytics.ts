"use client";

import { useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import type { DemoAnalyticsEventName } from "@/types/demo";

export function useDemoAnalytics(demoId: string, locale: Locale) {
  const trackEvent = useCallback(
    async (
      event: DemoAnalyticsEventName,
      metadata?: Record<string, string | number | boolean>,
    ) => {
      const payload = {
        event,
        demoId,
        locale,
        metadata,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch("/api/demo-events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          keepalive: true,
        });
      } catch {
        // Silent fail to avoid impacting demo UX.
      }
    },
    [demoId, locale],
  );

  return { trackEvent };
}
