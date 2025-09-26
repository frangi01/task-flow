import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
   // const { db } = await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    //const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // TODO: replace with hashed password check (e.g., bcrypt.compare)
    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Don’t leak password
    const { password: _pw, ...safeUser } = user;

    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
