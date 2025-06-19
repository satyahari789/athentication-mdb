import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/mongodb";
import User from "../../models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: "User registered" });
}
