import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Figma, Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full bg-primary/25">
      {/* 1200 기준 컨테이너 + 전체 패딩 32 */}
      <div className="mx-auto w-full max-w-[1200px] p-8">
        {/* 전체 높이: 275 느낌 (고정이 필요하면 h-[275px]) */}
        <div className="flex gap-8">
          {/* 컬럼 1: 아이콘들 (세로 스택) */}
          <Card className="flex flex-col gap-8 p-8 bg-background/0 border-0 shadow-none">
            <Button variant="ghost" size="icon" aria-label="Figma">
              <Figma className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Github">
              <Github className="h-6 w-6" />
            </Button>
          </Card>

          {/* 컬럼 2: 빈 영역(추가 내용 들어갈 자리) */}
          <Card className="flex flex-1 flex-col gap-8 p-8 bg-background/0 border-0 shadow-none">
            {/* TODO: 링크/텍스트/버튼 등 */}
          </Card>

          {/* 컬럼 3: 빈 영역 */}
          <Card className="flex flex-1 flex-col gap-8 p-8 bg-background/0 border-0 shadow-none">
            {/* TODO */}
          </Card>
        </div>
      </div>
    </footer>
  )
}
