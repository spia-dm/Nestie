import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const user = await User.findOne({id:body.id})
    return NextResponse.json({notifications:user.notifications});
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
