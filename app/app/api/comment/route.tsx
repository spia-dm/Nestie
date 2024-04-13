import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    await dbConnect();
    const house = await House.findOne({ id: body.id });
    var comment_list = house.comments;
    
    console.log(body.comment);
    comment_list.push([body.comment,body.name]);
    console.log(comment_list);
    
    const house_comment = await House.findOneAndUpdate({ id: body.id }, { $set: { comments: comment_list } });
    return NextResponse.json({ status: 200, message: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
