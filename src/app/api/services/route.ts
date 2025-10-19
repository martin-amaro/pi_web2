import { NextResponse } from 'next/server';
import { readDb, writeDb } from '../_lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.services);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDb();
  const newService = { id: (db.services.length || 0) + 1, ...body };
  db.services.push(newService);
  writeDb(db);
  return NextResponse.json(newService);
}
