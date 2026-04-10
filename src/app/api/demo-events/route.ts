import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { DemoAnalyticsEvent } from "@/types/demo";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DemoAnalyticsEvent;

    if (!body?.event || !body?.demoId || !body?.locale || !body?.timestamp) {
      return NextResponse.json(
        { error: "Missing required event fields" },
        { status: 400 },
      );
    }

    if (supabase) {
      const { error } = await supabase.from("demo_events").insert({
        event: body.event,
        demo_id: body.demoId,
        locale: body.locale,
        metadata: body.metadata ?? {},
        created_at: body.timestamp,
      });

      if (error) {
        console.error("[demo-event][supabase-error]", error.message);
        return NextResponse.json(
          { error: "Failed to store demo event" },
          { status: 500 },
        );
      }
    } else {
      // Fallback in environments where analytics DB is not configured.
      console.info("[demo-event]", JSON.stringify(body));
    }

    return NextResponse.json({ success: true }, { status: 202 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process demo event" },
      { status: 500 },
    );
  }
}
