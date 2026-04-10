import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/leads/track
 * Track leads from demos
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["leadData", "demoType"];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing: missingFields },
        { status: 400 },
      );
    }

    const { leadData, demoType } = body;

    // Validate demo type
    const validTypes = [
      "saas",
      "ecommerce",
      "restaurant",
      "booking",
      "chatbot",
    ];
    if (!validTypes.includes(demoType)) {
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

    // Create lead in database
    const now = new Date().toISOString();
    const leadId = crypto.randomUUID();

    const { data, error } = await supabase
      .from("lead_tracking")
      .insert({
        id: leadId,
        demo_type: demoType,
        lead_data: {
          ...leadData,
          status: "new",
          createdAt: now,
        },
        status: "new",
        source: demoType,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create lead", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        leadId,
        lead: data.lead_data,
        message: "Lead captured successfully",
      },
      { status: 201 },
    );
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
 * GET /api/leads/track
 * Get tracked leads
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const demoType = searchParams.get("type");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    let query = supabase
      .from("lead_tracking")
      .select(
        "*, lead_data(id, name, email, company, interest, status, createdAt)",
      );

    if (demoType) {
      query = query.eq("demo_type", demoType);
    }

    if (status) {
      query = query.eq("status", status);
    }

    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to retrieve leads", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      leads: data,
      count: data?.length || 0,
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
