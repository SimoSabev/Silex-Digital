import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/real-time/[type]
 * Get real-time metrics for a specific demo type
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;

    // Validate demo type
    const validTypes = [
      "saas",
      "ecommerce",
      "restaurant",
      "booking",
      "chatbot",
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid demo type", validTypes },
        { status: 400 },
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    // Fetch analytics data
    const { data, error } = await supabase
      .from("analytics_data")
      .select("metrics, timestamp")
      .eq("demo_type", type)
      .order("timestamp", { ascending: false })
      .limit(10)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch analytics data", details: error.message },
        { status: 500 },
      );
    }

    // Get latest data
    const latestData = data?.metrics;

    if (!latestData) {
      return NextResponse.json(
        { error: "No analytics data found for this type" },
        { status: 404 },
      );
    }

    // Add current timestamp
    const response = {
      ...latestData,
      timestamp: data.timestamp,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/real-time/[type]
 * Update real-time metrics (for simulation/demo purposes)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
) {
  try {
    const { type } = await params;
    const body = await request.json();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    // Create new analytics entry
    const { data, error } = await supabase
      .from("analytics_data")
      .insert({
        demo_type: type,
        metrics: body,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update analytics data", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: data.metrics,
      message: "Analytics data updated successfully",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
