"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Shield, BarChart3, Link2 } from "lucide-react"

const plans = [
  {
    name: "무료",
    price: "0",
    period: "월",
    description: "개인 사용자를 위한 기본 기능",
    features: ["월 100개 URL 단축", "기본 통계 제공", "7일 링크 보관", "표준 지원"],
    limitations: ["커스텀 URL 불가", "태그 기능 제한", "만료일 설정 불가"],
    buttonText: "무료로 시작하기",
    popular: false,
    color: "muted",
  },
  {
    name: "프리미엄",
    price: "9,900",
    period: "월",
    description: "전문가와 비즈니스를 위한 고급 기능",
    features: [
      "무제한 URL 단축",
      "커스텀 URL 설정",
      "고급 통계 및 분석",
      "태그 및 분류 기능",
      "만료일 설정",
      "즐겨찾기 관리",
      "우선 지원",
      "API 접근",
    ],
    buttonText: "프리미엄 시작하기",
    popular: true,
    color: "primary",
  },
]

const features = [
  {
    icon: Link2,
    title: "무제한 URL 단축",
    description: "필요한 만큼 링크를 단축하세요",
    color: "primary",
  },
  {
    icon: Crown,
    title: "커스텀 URL",
    description: "브랜드에 맞는 맞춤형 링크",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "상세한 분석",
    description: "클릭 통계와 사용자 분석",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "보안 및 안전",
    description: "모든 링크는 안전하게 보호됩니다",
    color: "primary",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-40 h-40 bg-accent/10 rounded-full blur-2xl opacity-60" />
        <div className="absolute top-60 right-32 w-32 h-32 bg-primary/10 rounded-full blur-xl opacity-60" />
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-sm shadow-lg shadow-accent/10">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">간단하고 투명한 요금제</span>
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground">
              당신에게 맞는{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                플랜
              </span>
              을 선택하세요
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              개인 사용자부터 비즈니스까지, 모든 요구사항에 맞는 플랜을 제공합니다
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative border-border/50 shadow-2xl shadow-black/10 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-[1.02] transition-all duration-300 overflow-hidden ${
                  plan.popular ? "ring-2 ring-primary/20 hover:ring-primary/30" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-sm font-medium">
                    <Crown className="w-4 h-4 inline mr-1" />
                    가장 인기있는 플랜
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <CardHeader className={`relative z-10 ${plan.popular ? "pt-12" : "pt-6"}`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                    {plan.name === "프리미엄" && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="flex items-baseline gap-1 pt-4">
                    <span className="text-4xl font-bold text-foreground">₩{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 relative z-10">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      포함된 기능
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-green-500" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations && (
                    <div className="space-y-3 pt-4 border-t border-border/30">
                      <h4 className="font-semibold text-muted-foreground text-sm">제한사항</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-center gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                            </div>
                            <span className="text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full shadow-lg will-change-transform hover:scale-105 active:scale-95 transition-all duration-200 ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                        : "bg-secondary hover:bg-secondary/90 shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30"
                    }`}
                    size="lg"
                  >
                    {plan.popular && <Crown className="w-4 h-4 mr-2" />}
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-serif font-bold text-3xl text-foreground">모든 플랜에서 제공하는 핵심 기능</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cutlet의 강력한 기능들로 더 효율적인 링크 관리를 경험하세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95 will-change-transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                  >
                    <CardContent className="pt-6 text-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center shadow-lg will-change-transform group-hover:scale-110 transition-all duration-300 ${
                          feature.color === "primary"
                            ? "bg-primary/10 shadow-primary/20 group-hover:shadow-primary/30"
                            : feature.color === "accent"
                              ? "bg-accent/10 shadow-accent/20 group-hover:shadow-accent/30"
                              : "bg-secondary/10 shadow-secondary/20 group-hover:shadow-secondary/30"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            feature.color === "primary"
                              ? "text-primary"
                              : feature.color === "accent"
                                ? "text-accent"
                                : "text-secondary"
                          }`}
                        />
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-serif font-bold text-3xl text-foreground mb-4">자주 묻는 질문</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    무료 플랜에서 프리미엄으로 언제든 업그레이드할 수 있나요?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    네, 언제든지 프리미엄 플랜으로 업그레이드할 수 있습니다. 기존 데이터는 모두 보존됩니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">프리미엄 플랜을 취소할 수 있나요?</h3>
                  <p className="text-muted-foreground text-sm">
                    언제든지 구독을 취소할 수 있습니다. 취소 후에도 현재 결제 기간이 끝날 때까지 프리미엄 기능을 사용할
                    수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">API는 어떻게 사용하나요?</h3>
                  <p className="text-muted-foreground text-sm">
                    프리미엄 플랜에서 API 키를 발급받아 개발자 문서에 따라 연동할 수 있습니다.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-lg shadow-black/5 backdrop-blur-sm bg-card/95">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">데이터는 얼마나 오래 보관되나요?</h3>
                  <p className="text-muted-foreground text-sm">
                    무료 플랜은 7일, 프리미엄 플랜은 무제한으로 데이터를 보관합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
