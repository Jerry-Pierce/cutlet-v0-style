"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonitoringDashboard } from "@/components/ui/monitoring-dashboard"
import { AlertCircle, Activity, Server, Database } from "lucide-react"

export default function MonitoringPage() {
  const { user } = useAuth()

  // 관리자 권한 확인
  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">접근 권한이 없습니다</h1>
            <p className="text-muted-foreground">
              이 페이지에 접근하려면 관리자 권한이 필요합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">시스템 모니터링</h1>
          <p className="text-muted-foreground">
            실시간 시스템 상태, 성능 메트릭, 데이터베이스 통계를 모니터링할 수 있습니다.
          </p>
        </div>

        {/* 모니터링 대시보드 */}
        <MonitoringDashboard />

        {/* 추가 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-blue-500" />
                실시간 모니터링
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                시스템 상태, 사용자 활동, URL 생성 등의 실시간 정보를 30초마다 자동으로 업데이트합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server className="w-5 h-5 text-green-500" />
                성능 추적
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                API 응답 시간, 데이터베이스 성능, 시스템 리소스 사용률을 지속적으로 모니터링합니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="w-5 h-5 text-purple-500" />
                데이터 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                사용자 성장률, URL 클릭 통계, 데이터베이스 테이블 크기 등의 상세한 분석 정보를 제공합니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 모니터링 가이드 */}
        <Card>
          <CardHeader>
            <CardTitle>모니터링 가이드</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">시스템 개요</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 전체 시스템 상태 및 기본 정보</li>
                  <li>• 사용자, URL, 클릭 통계</li>
                  <li>• 실시간 성장률 및 트렌드</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">성능 메트릭</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• API 응답 시간 모니터링</li>
                  <li>• 데이터베이스 성능 측정</li>
                  <li>• 시스템 리소스 사용률</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">데이터베이스</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 테이블별 레코드 수</li>
                  <li>• 테이블 크기 및 공간 사용량</li>
                  <li>• 전체 데이터베이스 통계</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">사용자 통계</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 사용자 등록 및 활성도</li>
                  <li>• 프리미엄 사용자 비율</li>
                  <li>• 사용자 성장률 분석</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
