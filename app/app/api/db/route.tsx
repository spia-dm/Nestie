import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    await dbConnect();
    const user = new User(body);
    const find_user = await User.exists({email:body.email})
    console.log(body.email)
    console.log(find_user)
    var value=true
    if(find_user!==null){
      value=false
    }
    console.log(value)
    if(value){
      await user.save();
      return NextResponse.json({
        status: 200,
        message: "success",
      });
    }
    else if(!value){
      return NextResponse.json({
        status: 201,
        message: "success",
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
