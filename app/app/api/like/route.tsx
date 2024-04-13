import User from "../../models/User";
import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const house = await House.findOne({id:body.id})
    const like_list = house.likes
    const index = like_list.indexOf(body.email);
if (index === -1){
    like_list.push(body.email)
}
console.log(like_list)
    const house_like = await House.findOneAndUpdate({ id: body.id },{ $set: { likes: like_list}});
    return NextResponse.json({
        status: 200,
        message: "liked successfully",
        data:{
          likes:like_list
        }
      });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
