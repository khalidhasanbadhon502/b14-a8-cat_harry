import { NextResponse } from "next/server";
import { parseStudioInput } from "@/lib/studios";
import { createStudio, listStudios, listStudiosByOwner } from "@/lib/studios-db";
import { getSessionOwner } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mineOnly = url.searchParams.get("mine") === "1";

    if (mineOnly) {
      const owner = await getSessionOwner();
      if (!owner) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const studios = await listStudiosByOwner(owner.id);
      return NextResponse.json(studios);
    }

    const studios = await listStudios();
    return NextResponse.json(studios);
  } catch (error) {
    console.error("GET /api/studios error:", error);
    return NextResponse.json(
      { error: "Studios API unavailable" },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const owner = await getSessionOwner();
    if (!owner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const input = parseStudioInput(body);
    if ("error" in input) {
      return NextResponse.json({ error: input.error }, { status: 400 });
    }

    const studio = await createStudio(input, owner);
    return NextResponse.json(studio, { status: 201 });
  } catch (error) {
    console.error("POST /api/studios error:", error);
    return NextResponse.json(
      { error: "Could not create the studio" },
      { status: 500 }
    );
  }
}
