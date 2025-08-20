import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthenticatedRequest } from '@/lib/auth-middleware'
import { db } from '@/lib/database'

// 프로필 조회
async function GETHandler(request: AuthenticatedRequest) {
  try {
    const userId = request.user!.userId

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        isPremium: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            shortenedUrls: true,
            favorites: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        isPremium: user.isPremium,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stats: {
          totalUrls: user._count.shortenedUrls,
          totalFavorites: user._count.favorites
        }
      }
    })

  } catch (error) {
    console.error('프로필 조회 오류:', error)
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 프로필 업데이트
async function PATCHHandler(request: AuthenticatedRequest) {
  try {
    const userId = request.user!.userId
    const body = await request.json()

    // 업데이트 가능한 필드들
    const updateData: any = {}
    
    if (body.username !== undefined) {
      // 사용자명 중복 확인
      if (body.username) {
        const existingUser = await db.user.findUnique({
          where: {
            username: body.username,
            NOT: {
              id: userId
            }
          }
        })
        
        if (existingUser) {
          return NextResponse.json(
            { error: '이미 사용 중인 사용자명입니다.' },
            { status: 409 }
          )
        }
      }
      updateData.username = body.username
    }

    // 사용자 정보 업데이트
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        isPremium: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: '프로필이 성공적으로 업데이트되었습니다.',
      data: updatedUser
    })

  } catch (error) {
    console.error('프로필 업데이트 오류:', error)
    
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export const GET = requireAuth(GETHandler)
export const PATCH = requireAuth(PATCHHandler)
