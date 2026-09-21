import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getStudentSession } from '../../../../lib/student-auth';
const prisma = new PrismaClient();
export async function GET() { const s=getStudentSession(); if(!s)return NextResponse.json({error:'Unauthorized'},{status:401}); try { const account=await prisma.feeAccount.findUnique({where:{studentId:s.studentId},include:{payments:{orderBy:{paymentDate:'desc'}}}}); return NextResponse.json({fees:account}); } catch { return NextResponse.json({error:'ERP database migration is required'},{status:503}); } }
