import {NextResponse,NextRequest} from 'next/server'
import User from "../../models/User";
import { dbConnect } from "../../utils/mongoose";
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

export async function GET(req: NextRequest, res: NextResponse){
    var secret = speakeasy.generateSecret();
var secret2 = secret.base32;
console.log(secret2);

var label = 'PropertEase';
var otpauth_url = speakeasy.otpauthURL({
  secret: secret.ascii,
  label: label,
  issuer: 'PropertEase'
});

qrcode.toFile('qr_code.png', otpauth_url, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('QR code saved as qr_code.png');
});
return NextResponse.json({message:secret2})
}