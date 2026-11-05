import { NextResponse } from "next/server";
import { listCategories } from "@/lib/studios-db";

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { error: "Categories API unavailable" },
      { status: 503 }
    );
  }
}
