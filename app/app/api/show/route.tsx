import { NextRequest, NextResponse } from 'next/server';
import House from "../../models/House";
import { dbConnect } from "../../utils/mongoose";
export async function POST(req: NextRequest,res:NextResponse) {
  await dbConnect()
  const body = await req.json()
  console.log(body)
  const find_house = await House.findOne({id:body.id})
  console.log(find_house)

  return NextResponse.json(find_house);
}
