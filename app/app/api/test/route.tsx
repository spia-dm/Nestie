import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const searchParams = url.searchParams;
  searchParams.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  return NextResponse.json({ "test": "test" });
}
