import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { UserDoc } from "@/types/model";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const users = await getCollection<UserDoc>("users");
    const user = await users.findOne({ email }, { projection: { password: 1, email: 1, createdAt: 1 } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // 🔑 Check hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Don’t leak password
    const { password: _pw, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
