"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Lock, Bell, Key, Crown, Shield, Trash2, Camera, Copy, RefreshCw, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const profileSections = [
  { id: "general", label: "일반 정보", icon: User },
  { id: "security", label: "보안", icon: Lock },
  { id: "notifications", label: "알림", icon: Bell },
  { id: "subscription", label: "구독", icon: Crown },
  { id: "api", label: "API", icon: Key },
  { id: "danger", label: "계정 관리", icon: Shield },
]

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("general")
  const [profileData, setProfileData] = useState({
    name: "김철수",
    email: "kimcs@example.com",
    avatar: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  })
  const [apiKey] = useState("cutlet_sk_1234567890abcdef")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "저장 완료",
      description: "프로필 정보가 성공적으로 업데이트되었습니다.",
    })
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "복사 완료",
      description: "API 키가 클립보드에 복사되었습니다.",
    })
  }

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">일반 정보</h2>
              <p className="text-muted-foreground">기본 프로필 정보를 관리하세요</p>
            </div>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardContent className="pt-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20 shadow-lg shadow-black/10">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{profileData.name}</h3>
                    <p className="text-muted-foreground">{profileData.email}</p>
                    <Badge variant="secondary" className="mt-2 bg-accent/10 text-accent border-accent/20">
                      <Crown className="w-3 h-3 mr-1" />
                      프리미엄 사용자
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="shadow-inner shadow-black/5"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="shadow-inner shadow-black/5"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} className="shadow-lg shadow-primary/25">
                    변경사항 저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">보안</h2>
              <p className="text-muted-foreground">계정 보안을 강화하세요</p>
            </div>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  비밀번호 변경
                </CardTitle>
                <CardDescription>새로운 비밀번호로 계정을 보호하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">현재 비밀번호</Label>
                  <Input id="current-password" type="password" className="shadow-inner shadow-black/5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">새 비밀번호</Label>
                  <Input id="new-password" type="password" className="shadow-inner shadow-black/5" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                  <Input id="confirm-password" type="password" className="shadow-inner shadow-black/5" />
                </div>
                <Button className="w-full shadow-lg shadow-primary/25">비밀번호 변경</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  2단계 인증
                </CardTitle>
                <CardDescription>추가 보안 계층으로 계정을 보호하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2단계 인증 활성화</p>
                    <p className="text-sm text-muted-foreground">SMS 또는 인증 앱을 통한 추가 인증</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">알림 설정</h2>
              <p className="text-muted-foreground">받고 싶은 알림을 선택하세요</p>
            </div>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">이메일 알림</p>
                      <p className="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받기</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">푸시 알림</p>
                      <p className="text-sm text-muted-foreground">브라우저 푸시 알림 받기</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium">마케팅 알림</p>
                      <p className="text-sm text-muted-foreground">새로운 기능 및 프로모션 정보</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "subscription":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">구독 관리</h2>
              <p className="text-muted-foreground">현재 구독 상태와 사용량을 확인하세요</p>
            </div>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-accent" />
                  현재 플랜: 프리미엄
                </CardTitle>
                <CardDescription>다음 결제일: 2024년 9월 18일</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">이번 달 단축 링크</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-green-600">무제한</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">총 클릭 수</p>
                    <p className="text-2xl font-bold">15,892</p>
                    <p className="text-xs text-muted-foreground">전체 기간</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    플랜 변경
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    결제 내역
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "api":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">API 관리</h2>
              <p className="text-muted-foreground">개발자 API 키를 관리하세요</p>
            </div>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API 키
                </CardTitle>
                <CardDescription>프리미엄 사용자만 API를 사용할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={apiKey} readOnly className="font-mono text-sm shadow-inner shadow-black/5" />
                  <Button variant="outline" size="sm" onClick={handleCopyApiKey}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">API 사용량 (이번 달)</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">요청 수</p>
                      <p className="font-semibold">2,847 / 10,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">성공률</p>
                      <p className="font-semibold text-green-600">99.8%</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  API 문서 보기
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "danger":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">계정 관리</h2>
              <p className="text-muted-foreground">계정 삭제 및 데이터 관리</p>
            </div>

            <Card className="border-destructive/50 shadow-lg shadow-destructive/10 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  계정 삭제
                </CardTitle>
                <CardDescription>계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">삭제될 데이터:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 모든 단축 링크 및 통계</li>
                    <li>• 프로필 정보 및 설정</li>
                    <li>• 구독 정보 및 결제 내역</li>
                    <li>• API 키 및 사용 기록</li>
                  </ul>
                </div>

                <Button variant="destructive" className="w-full shadow-lg shadow-destructive/25">
                  <Trash2 className="w-4 h-4 mr-2" />
                  계정 삭제하기
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-32 w-36 h-36 bg-primary/10 rounded-full blur-2xl opacity-60" />
        <div className="absolute top-80 right-40 w-28 h-28 bg-accent/10 rounded-full blur-xl opacity-60" />
        <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 sticky top-8">
                <CardHeader>
                  <CardTitle className="font-serif text-lg">프로필 설정</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {profileSections.map((section) => {
                      const Icon = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 will-change-transform hover:scale-[1.02] ${
                            activeSection === section.id
                              ? "bg-primary/10 text-primary border-r-2 border-primary shadow-lg shadow-primary/10"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{section.label}</span>
                        </button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
