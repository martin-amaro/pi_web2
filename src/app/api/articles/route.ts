import { NextResponse } from 'next/server';
import { readDb, writeDb } from '../_lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.articles);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = readDb();
  const newArticle = { id: (db.articles.length || 0) + 1, ...body };
  db.articles.push(newArticle);
  writeDb(db);
  return NextResponse.json(newArticle);
}
