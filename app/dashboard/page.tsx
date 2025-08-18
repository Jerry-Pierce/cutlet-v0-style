"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Link,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Copy,
  ExternalLink,
  Calendar,
  Heart,
  Tag,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const statsData = [
  { name: "월", clicks: 2400 },
  { name: "화", clicks: 1398 },
  { name: "수", clicks: 9800 },
  { name: "목", clicks: 3908 },
  { name: "금", clicks: 4800 },
  { name: "토", clicks: 3800 },
  { name: "일", clicks: 4300 },
]

const deviceData = [
  { name: "데스크톱", value: 45, color: "#dc2626" },
  { name: "모바일", value: 35, color: "#f59e0b" },
  { name: "태블릿", value: 20, color: "#15803d" },
]

const recentLinks = [
  {
    id: 1,
    original: "https://example.com/very-long-url-that-needs-shortening",
    short: "cutlet.ly/abc123",
    clicks: 247,
    created: "2024-08-15",
    tags: ["업무", "마케팅"],
    favorite: true,
  },
  {
    id: 2,
    original: "https://github.com/user/awesome-project",
    short: "cutlet.ly/github-proj",
    clicks: 89,
    created: "2024-08-14",
    tags: ["개발"],
    favorite: false,
  },
  {
    id: 3,
    original: "https://docs.google.com/presentation/d/1234567890",
    short: "cutlet.ly/xyz789",
    clicks: 156,
    created: "2024-08-13",
    tags: ["프레젠테이션", "업무"],
    favorite: true,
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "복사 완료",
      description: "링크가 클립보드에 복사되었습니다.",
    })
  }

  const filteredLinks = recentLinks.filter(
    (link) =>
      link.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-24 w-40 h-40 bg-secondary/10 rounded-full blur-2xl opacity-60" />
        <div className="absolute top-64 right-32 w-32 h-32 bg-primary/10 rounded-full blur-xl opacity-60" />
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif font-bold text-3xl text-foreground">대시보드</h1>
              <p className="text-muted-foreground">링크 활동과 통계를 한눈에 확인하세요</p>
            </div>
            <Button className="shadow-lg shadow-primary/25 will-change-transform hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />새 링크 만들기
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">총 링크 수</p>
                    <p className="text-3xl font-bold text-foreground">1,247</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +12% 이번 달
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 will-change-transform group-hover:scale-110 transition-all duration-300">
                    <Link className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">총 클릭 수</p>
                    <p className="text-3xl font-bold text-foreground">15,892</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +8% 이번 달
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-xl group-hover:shadow-accent/30 will-change-transform group-hover:scale-110 transition-all duration-300">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/10 group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">이번 달 방문자</p>
                    <p className="text-3xl font-bold text-foreground">3,421</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +15% 이번 달
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shadow-lg shadow-secondary/20 group-hover:shadow-xl group-hover:shadow-secondary/30 will-change-transform group-hover:scale-110 transition-all duration-300">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">평균 CTR</p>
                    <p className="text-3xl font-bold text-foreground">12.7%</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +2.1% 이번 달
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 will-change-transform group-hover:scale-110 transition-all duration-300">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="font-serif">주간 클릭 통계</CardTitle>
                <CardDescription>최근 7일간의 클릭 추이</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="font-serif">디바이스별 접속</CardTitle>
                <CardDescription>사용자 디바이스 분포</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {deviceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Links */}
          <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-serif">최근 생성한 링크</CardTitle>
                  <CardDescription>최근에 만든 단축 링크들을 관리하세요</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="링크 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 shadow-inner shadow-black/5"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>원본 URL</TableHead>
                    <TableHead>단축 URL</TableHead>
                    <TableHead>클릭 수</TableHead>
                    <TableHead>생성일</TableHead>
                    <TableHead>태그</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLinks.map((link) => (
                    <TableRow key={link.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="max-w-xs">
                        <div className="flex items-center gap-2">
                          {link.favorite && <Heart className="w-4 h-4 text-pink-500 fill-current" />}
                          <span className="truncate" title={link.original}>
                            {link.original}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{link.short}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                          {link.clicks.toLocaleString()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {link.created}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {link.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyLink(link.short)}
                            className="will-change-transform hover:scale-110"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="will-change-transform hover:scale-110"
                            onClick={() => window.open(link.original, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
