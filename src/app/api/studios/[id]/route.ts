import { NextResponse } from "next/server";
import { parseStudioPatch } from "@/lib/studios";
import { deleteStudio, getStudioById, updateStudio } from "@/lib/studios-db";
import { getSessionOwner } from "@/lib/session";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const studio = await getStudioById(id);
    if (!studio) {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }
    return NextResponse.json(studio);
  } catch (error) {
    console.error("GET /api/studios/[id] error:", error);
    return NextResponse.json(
      { error: "Studios API unavailable" },
      { status: 503 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const owner = await getSessionOwner();
    if (!owner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const input = parseStudioPatch(body);
    if ("error" in input) {
      return NextResponse.json({ error: input.error }, { status: 400 });
    }

    const result = await updateStudio(id, input, owner);

    if (result.status === "not-found") {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }
    if (result.status === "forbidden") {
      return NextResponse.json(
        { error: "You can only edit your own studios" },
        { status: 403 }
      );
    }

    return NextResponse.json(result.studio);
  } catch (error) {
    console.error("PATCH /api/studios/[id] error:", error);
    return NextResponse.json(
      { error: "Could not update the studio" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const owner = await getSessionOwner();
    if (!owner) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const result = await deleteStudio(id, owner);

    if (result === "not-found") {
      return NextResponse.json({ error: "Studio not found" }, { status: 404 });
    }
    if (result === "forbidden") {
      return NextResponse.json(
        { error: "You can only delete your own studios" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/studios/[id] error:", error);
    return NextResponse.json(
      { error: "Could not delete the studio" },
      { status: 500 }
    );
  }
}
