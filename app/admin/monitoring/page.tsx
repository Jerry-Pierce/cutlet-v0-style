"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MonitoringPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">시스템 모니터링</h1>
          <p className="text-muted-foreground">
            실시간 시스템 상태를 모니터링할 수 있습니다.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>모니터링 대시보드</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              모니터링 기능이 준비 중입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
