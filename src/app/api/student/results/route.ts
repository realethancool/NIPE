import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getStudentSession } from '../../../../lib/student-auth';
const prisma = new PrismaClient();
export async function GET() { const s=getStudentSession(); if(!s)return NextResponse.json({error:'Unauthorized'},{status:401}); try { const rows=await prisma.result.findMany({where:{studentId:s.studentId,status:'PUBLISHED'},orderBy:{semesterNumber:'asc'},include:{subjects:{include:{subject:{select:{code:true,name:true}}}}}}); return NextResponse.json({results:rows}); } catch { return NextResponse.json({error:'ERP database migration is required'},{status:503}); } }
