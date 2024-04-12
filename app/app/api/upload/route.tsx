import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body)
    await dbConnect();
    const user_data=new House(body)
    await user_data.save()
    return NextResponse.json({
        status: 200,
        message: "Uploaded successfully",
      });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
