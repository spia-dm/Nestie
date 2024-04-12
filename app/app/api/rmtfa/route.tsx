import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const user = await User.findOne({ email: body.email });
    if (user) {
      await User.findOneAndUpdate(
        { email: body.email },
        { $set: { secret: "" } }
      );

      return NextResponse.json({
        status: 200,
        message: "Secret updated successfully",
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
