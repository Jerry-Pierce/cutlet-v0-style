import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 데이터베이스 시드 데이터를 삽입합니다...')

  // 샘플 태그 생성
  const tags = [
    { name: '업무', color: '#3B82F6' },
    { name: '개인', color: '#10B981' },
    { name: '프로젝트', color: '#F59E0B' },
    { name: '학습', color: '#8B5CF6' },
    { name: '뉴스', color: '#EF4444' },
    { name: '엔터테인먼트', color: '#EC4899' },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    })
  }

  console.log('✅ 태그 데이터 삽입 완료')

  // 샘플 URL 생성 (테스트용)
  const sampleUrls = [
    {
      originalUrl: 'https://github.com/vercel/next.js',
      shortCode: 'nextjs',
      title: 'Next.js - React 프레임워크',
      description: 'Vercel에서 개발한 React 기반 풀스택 프레임워크',
      tags: ['프로젝트', '학습'],
    },
    {
      originalUrl: 'https://tailwindcss.com',
      shortCode: 'tailwind',
      title: 'Tailwind CSS',
      description: '유틸리티 우선 CSS 프레임워크',
      tags: ['학습', '프로젝트'],
    },
    {
      originalUrl: 'https://prisma.io',
      shortCode: 'prisma',
      title: 'Prisma - Database ORM',
      description: '현대적인 데이터베이스 ORM',
      tags: ['학습', '프로젝트'],
    },
  ]

  for (const urlData of sampleUrls) {
    const { tags: tagNames, ...urlInfo } = urlData
    
    const url = await prisma.shortenedUrl.upsert({
      where: { shortCode: urlInfo.shortCode },
      update: {},
      create: {
        ...urlInfo,
        isFavorite: true,
      },
    })

    // 태그 연결
    for (const tagName of tagNames) {
      const tag = await prisma.tag.findUnique({
        where: { name: tagName },
      })
      
      if (tag) {
        await prisma.urlTag.upsert({
          where: {
            urlId_tagId: {
              urlId: url.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            urlId: url.id,
            tagId: tag.id,
          },
        })
      }
    }
  }

  console.log('✅ 샘플 URL 데이터 삽입 완료')

  // 샘플 클릭 데이터 생성
  const sampleClicks = [
    { ipAddress: '127.0.0.1', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    { ipAddress: '192.168.1.1', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    { ipAddress: '10.0.0.1', userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' },
  ]

  for (const clickData of sampleClicks) {
    const url = await prisma.shortenedUrl.findFirst()
    if (url) {
      await prisma.urlClick.create({
        data: {
          urlId: url.id,
          ...clickData,
        },
      })
    }
  }

  console.log('✅ 샘플 클릭 데이터 삽입 완료')
  console.log('🎉 모든 시드 데이터 삽입이 완료되었습니다!')
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 삽입 중 오류 발생:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
