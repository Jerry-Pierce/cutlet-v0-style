import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/database'

// 회원가입 요청 스키마
const registerSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
  username: z.string().min(2, '사용자명은 최소 2자 이상이어야 합니다').optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)
    
    const { email, password, username } = validatedData

    // 이메일 중복 확인
    const existingUser = await db.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다.' },
        { status: 409 }
      )
    }

    // 사용자명 중복 확인 (제공된 경우)
    if (username) {
      const existingUsername = await db.user.findUnique({
        where: { username }
      })
      
      if (existingUsername) {
        return NextResponse.json(
          { error: '이미 사용 중인 사용자명입니다.' },
          { status: 409 }
        )
      }
    }

    // 비밀번호 해싱
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 사용자 생성
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        username: username || null,
      }
    })

    // 비밀번호 해시는 제외하고 응답
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: userWithoutPassword
    })

  } catch (error) {
    console.error('회원가입 오류:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다.', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
