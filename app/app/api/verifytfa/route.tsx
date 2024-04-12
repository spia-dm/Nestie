const speakeasy = require('speakeasy');

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest,res:NextResponse) {
const body = await req.json()
console.log(body)
try {
    var base32secret = body.secret; 

var userToken = body.user_token;

var verified = speakeasy.totp.verify({ 
  secret: base32secret,
  encoding: 'base32',
  token: userToken 
});

return NextResponse.json({message:verified})
  }
  catch(e){
    console.log(e)
  }
}