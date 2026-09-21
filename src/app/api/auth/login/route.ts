import { NextRequest, NextResponse } from 'next/server';
import { generateToken, setSessionCookie } from '../../../../lib/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    try {
      // Find user by email or username
      const user = await prisma.adminUser.findFirst({
        where: {
          OR: [
            { email: email },
            { username: email }
          ]
        }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        return NextResponse.json(
          { error: 'Account is temporarily locked. Please try again later.' },
          { status: 423 }
        );
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) {
        // Increment failed login attempts
        const failedAttempts = user.failedLoginAttempts + 1;
        const updateData: any = { failedLoginAttempts: failedAttempts };

        // Lock account after 5 failed attempts
        if (failedAttempts >= 5) {
          updateData.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        }

        await prisma.adminUser.update({
          where: { id: user.id },
          data: updateData
        });

        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Reset failed login attempts on successful login
      await prisma.adminUser.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedUntil: null,
          lastLogin: new Date()
        }
      });

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      setSessionCookie(token);

      // Log successful login
      await prisma.auditLog.create({
        data: {
          adminId: user.id,
          action: 'LOGIN',
          result: 'SUCCESS',
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
    } catch (dbError) {
      console.warn('Database not available:', dbError instanceof Error ? dbError.message : dbError);

      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Sign-in is temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
      
      // Development-only demo credentials
      if (email === 'admin@noble.edu.in' && password === 'admin123') {
        const token = generateToken({
          id: 'demo-admin-id',
          email: 'admin@noble.edu.in',
          username: 'admin',
          role: 'SUPER_ADMIN',
        });

        setSessionCookie(token);

        return NextResponse.json({
          success: true,
          user: {
            id: 'demo-admin-id',
            email: 'admin@noble.edu.in',
            username: 'admin',
            role: 'SUPER_ADMIN',
          },
          demoMode: true
        });
      }

      return NextResponse.json(
        { error: 'Invalid credentials (demo mode - use admin@noble.edu.in / admin123)' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
