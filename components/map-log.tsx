import Image from "next/image";
import { Card } from "@/components/ui/card";
import { GitCommitHorizontal, FileText } from "lucide-react";

type MapLogProps = {
  imageSrc: string;
  version: string;
  updatedAtText: string;
  fileName: string;
  fileSizeText: string;
  downloadUrl: string; // ✅ 추가
  downloadName?: string; // ✅ 선택
  title: string;
  subtitle: string;
  description: string;
};

export function MapLog({
  imageSrc,
  version,
  updatedAtText,
  fileName,
  fileSizeText,
  downloadUrl,
  downloadName,
  title,
  subtitle,
  description,
}: MapLogProps) {
  return (
    <section className="w-full m-8">
      {/* 패딩 없음, 좌우 간격 없음 */}
      <div className="flex w-full">
        {/* 사진 컴포넌트: 504x504, 정사각 비율 유지 */}
        <div className="relative w-[504px] aspect-square shrink-0 overflow-hidden bg-muted">
          <Image
            src={imageSrc}
            alt="map preview"
            fill
            className="object-cover"
            sizes="504px"
            priority={false}
          />
        </div>

        {/* 설명 컴포넌트: 오른쪽 세로 스택 */}
        <div className="flex min-w-0 flex-1 flex-row px-4 gap-4">
          {/* 커밋 아이콘: 패딩 32, 메인 테마 색 */}
          <div className="">
            <GitCommitHorizontal className="h-6 w-6 text-primary" />
          </div>

          {/* 맵 설명란: 세로 스택, gap 16, 패딩 32 */}
          <div className="flex flex-col flex-1 gap-4 ">
            {/* (맵 버전 + 수정 날짜) space-between */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">{version}</h2>
              <h4 className="text-sm font-medium text-slate-500">
                {updatedAtText}
              </h4>
            </div>

            {/* 다운로드 링크: 좌->우 */}
            <div className="flex items-center gap-2">
              {/* 다운로드 링크: 클릭 시 다운로드 */}
              <a
                href={downloadUrl}
                download={downloadName ?? true}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-600"
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {fileName} {fileSizeText ? `(${fileSizeText})` : ""}
                </span>
              </a>
            </div>

            {/* 구체적인 변경 로그: shadcn Card */}
            <Card className="border border-primary bg-card p-6">
              <div className="space-y-2">
                <div className="text-base font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{subtitle}</div>
                <p className="text-sm leading-relaxed text-foreground">
                  {description}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
