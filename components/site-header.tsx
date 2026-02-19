// app/components/site-header.tsx (원하는 경로에 두세요)
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="w-full bg-primary/50">
      {/* 1200px 기준 컨텐츠 폭 + 화면이 넓으면 가운데 정렬 */}
      <div className="w-full max-w-[1200px] px-8 py-8">
        {/* 왼쪽 정렬 */}
        <Link href="/" className="inline-flex items-center">
          <div className="flex items-center justify-start">
            {/* shadcn 스타일의 h1 느낌: 크게/굵게 */}
            <h1 className="text-2xl font-bold leading-none text-black">
              SCMaphub
            </h1>
          </div>
        </Link>
      </div>
    </header>
  )
}