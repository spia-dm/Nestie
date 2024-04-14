import User from "../../models/User";
import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const house = await House.findOne({id:body.id})
    const user = await User.findOne({})
    var user_notifs = user.notifications
    user_notifs.push(`${body.name} has requested more photos for "${house.house_name}"`)
    const user_2 = await User.findOneAndUpdate({ name:body.name },{ $set: { notifications: user_notifs}});
    return NextResponse.json({status:200,message:"ok"})
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
