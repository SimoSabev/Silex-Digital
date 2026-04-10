import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/demo-data/[type]
 * Fetch real demo data for a specific demo type
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

    // Fetch demo data
    const { data, error } = await supabase
      .from("demo_data")
      .select("data")
      .eq("demo_type", type)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch demo data", details: error.message },
        { status: 500 },
      );
    }

    // Parse the JSON data
    const demoData = data?.data;

    if (!demoData) {
      return NextResponse.json(
        { error: "No demo data found for this type" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: demoData });
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
 * POST /api/demo-data/[type]
 * Update demo data (for simulation/demo purposes)
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

    // Update demo data
    const { data, error } = await supabase
      .from("demo_data")
      .update({ data: body, updated_at: new Date().toISOString() })
      .eq("demo_type", type)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to update demo data", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: data.data,
      message: "Demo data updated successfully",
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
