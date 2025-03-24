import { NextResponse } from 'next/server';

export default function middleware(request) {
  // Simply pass the request through without any token verification
  return NextResponse.next();
}