import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  dbConnect();
  try {
    const userFound = await User.findOne({"name":"sid"});

    if (!userFound)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(userFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}