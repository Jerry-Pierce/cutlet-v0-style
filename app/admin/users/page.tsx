"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Crown, 
  Shield, 
  User, 
  Calendar,
  Link as LinkIcon,
  Heart,
  MousePointer,
  RefreshCw,
  AlertCircle
} from "lucide-react"

interface UserStats {
  totalUrls: number
  totalFavorites: number
  totalClicks: number
}

interface User {
  id: string
  email: string
  username: string
  isPremium: boolean
  isActive: boolean
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  lastUrlCreated: string | null
  lastActivity: string
  totalClicks: number
  stats: UserStats
}

interface Pagination {
  page: number
  limit: number
  totalUsers: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function UsersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")

  // 사용자 목록 로드
  const loadUsers = async (page = 1) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        search: searchTerm,
        status: statusFilter,
        sortBy,
        sortOrder
      })

      const response = await fetch(`/api/admin/users?${params}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const result = await response.json()
        setUsers(result.data.users)
        setPagination(result.data.pagination)
      } else {
        toast({
          title: "오류",
          description: "사용자 목록을 불러오는데 실패했습니다.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('사용자 목록 로드 오류:', error)
      toast({
        title: "오류",
        description: "사용자 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 검색 및 필터 적용
  const handleSearch = () => {
    loadUsers(1)
  }

  const handleFilterChange = (filter: string) => {
    setStatusFilter(filter)
    loadUsers(1)
  }

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
    loadUsers(1)
  }

  // 페이지 변경
  const handlePageChange = (page: number) => {
    loadUsers(page)
  }

  // 사용자 상태 변경 (프리미엄, 활성화 등)
  const handleUserStatusChange = async (userId: string, field: string, value: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ [field]: value })
      })

      if (response.ok) {
        toast({
          title: "성공",
          description: "사용자 정보가 업데이트되었습니다.",
        })
        loadUsers(pagination?.page || 1)
      } else {
        toast({
          title: "오류",
          description: "사용자 정보 업데이트에 실패했습니다.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('사용자 상태 변경 오류:', error)
      toast({
        title: "오류",
        description: "사용자 상태 변경에 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  // 초기 로드
  useEffect(() => {
    if (user?.isAdmin) {
      loadUsers()
    }
  }, [user])

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

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 숫자 포맷팅
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">사용자 관리</h1>
          <p className="text-muted-foreground">
            시스템의 모든 사용자를 관리하고 모니터링할 수 있습니다.
          </p>
        </div>

        {/* 검색 및 필터 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              사용자 검색 및 필터
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="이메일 또는 사용자명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  검색
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  초기화
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('all')}
              >
                전체
              </Button>
              <Button
                variant={statusFilter === 'premium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('premium')}
              >
                <Crown className="w-4 h-4 mr-1" />
                프리미엄
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('active')}
              >
                <User className="w-4 h-4 mr-1" />
                활성
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('inactive')}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                비활성
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 사용자 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>사용자 목록</span>
              {pagination && (
                <span className="text-sm text-muted-foreground">
                  총 {formatNumber(pagination.totalUsers)}명의 사용자
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">사용자 목록을 불러오는 중...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">사용자를 찾을 수 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {user.isAdmin && <Shield className="w-4 h-4 text-red-500" />}
                            {user.isPremium && <Crown className="w-4 h-4 text-amber-500" />}
                            <span className="font-medium">{user.username || '이름 없음'}</span>
                          </div>
                          <div className="flex gap-2">
                            {user.isAdmin && <Badge variant="destructive">관리자</Badge>}
                            {user.isPremium && <Badge variant="default">프리미엄</Badge>}
                            {user.isActive ? (
                              <Badge variant="secondary">활성</Badge>
                            ) : (
                              <Badge variant="outline">비활성</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          {user.email}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <LinkIcon className="w-4 h-4" />
                            <span>{formatNumber(user.stats.totalUrls)} URL</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{formatNumber(user.stats.totalFavorites)} 즐겨찾기</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MousePointer className="w-4 h-4" />
                            <span>{formatNumber(user.stats.totalClicks)} 클릭</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>가입: {formatDate(user.createdAt)}</span>
                          </div>
                        </div>

                        {user.lastUrlCreated && (
                          <div className="text-xs text-muted-foreground mt-2">
                            마지막 URL 생성: {formatDate(user.lastUrlCreated)}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserStatusChange(user.id, 'isPremium', !user.isPremium)}
                        >
                          {user.isPremium ? '프리미엄 해제' : '프리미엄 설정'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserStatusChange(user.id, 'isActive', !user.isActive)}
                        >
                          {user.isActive ? '비활성화' : '활성화'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 페이지네이션 */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  이전
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  {pagination.page} / {pagination.totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  다음
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
