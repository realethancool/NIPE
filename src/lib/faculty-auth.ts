import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
const COOKIE='faculty_session';
function secret(){if(!process.env.JWT_SECRET)throw new Error('JWT_SECRET is not configured');return process.env.JWT_SECRET;}
export function createFacultySession(facultyId:string){const token=jwt.sign({facultyId,type:'faculty'},secret(),{expiresIn:'8h'});cookies().set(COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',maxAge:28800,path:'/'});}
export function getFacultySession(){const token=cookies().get(COOKIE)?.value;if(!token)return null;try{const p=jwt.verify(token,secret()) as any;return p.type==='faculty'&&p.facultyId?{facultyId:p.facultyId}:null}catch{return null;}}
