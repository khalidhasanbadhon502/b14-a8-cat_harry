import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDbSync } from "@/lib/mongodb";

const DEMO_EMAIL = "demo@studiospace.com";
const DEMO_PASSWORD = "Demo123";
const DEMO_NAME = "Demo User";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const db = getDbSync();
    const existing = await db.collection("user").findOne({ email: DEMO_EMAIL });

    if (existing) {
      return NextResponse.json({
        seeded: false,
        message: "Demo user already exists",
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });
    }

    await auth.api.signUpEmail({
      body: {
        name: DEMO_NAME,
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      },
    });

    return NextResponse.json({
      seeded: true,
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
  } catch (error) {
    console.error("seed error:", error);
    return NextResponse.json(
      { error: "Could not seed the demo user" },
      { status: 500 }
    );
  }
}
