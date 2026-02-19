import { notFound } from "next/navigation"
import { MapLog } from "@/components/map-log"
import { supabase } from "@/lib/supabase"

type PageProps = {
  params: Promise<{ id: string }>
}
type MapLogProps = {
  imageSrc: string
  version: string
  updatedAtText: string
  fileName: string
  fileSizeText: string
  downloadUrl: string           // ✅ 추가
  downloadName?: string         // ✅ 선택
  title: string
  subtitle: string
  description: string
}

export default async function Page({ params }: PageProps) {
  const { id: slug } = await params
  if (!slug) return notFound()

  // 1) slug로 map_data 1건 조회
  const { data: mapData, error: mapErr } = await supabase
    .from("map_data")
    .select("*")
    .eq("slug", slug)
    .single()

  if (mapErr || !mapData) return notFound()

  // 2) map_log 조회: filename + file_size_bytes 포함
  const { data: logs, error: logErr } = await supabase
    .from("map_log")
    .select("id, created_at, map_version, file_src, file_name, file_size_bytes, change_log, map_data_id")
    .eq("map_data_id", mapData.id)
    .order("created_at", { ascending: false })

  if (logErr) throw new Error(logErr.message)

  return (
    <div className="w-full">
      <div className="space-y-8 p-8">
        {(logs ?? []).map((log) => (
          <MapLog
            key={log.id}
            imageSrc={mapData.image_src ?? "/maps/sample-1.png"}
            version={log.map_version}
            updatedAtText={new Date(log.created_at).toLocaleDateString("ko-KR")}
            fileName={log.file_name ?? extractFileName(log.file_src)}
            fileSizeText={formatBytes(log.file_size_bytes)}
            downloadUrl={log.file_src ?? ""}              // ✅ 추가
            downloadName={log.file_name ?? undefined}     // ✅ 선택(파일명 지정)
            title="변경 로그"
            subtitle=""
            description={log.change_log ?? ""}
          />

        ))}
      </div>
    </div>
  )
}

function extractFileName(fileSrc?: string | null) {
  if (!fileSrc) return ""
  return fileSrc.split("/").pop() ?? fileSrc
}

// bytes → "1 KB", "1.4 KB", "2.3 MB" 형태
function formatBytes(bytes?: number | null) {
  if (bytes == null || Number.isNaN(bytes)) return ""
  if (bytes === 0) return "0 B"

  const units = ["B", "KB", "MB", "GB", "TB"]
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }

  // KB 이상이면 소수 1자리, B면 정수
  const formatted =
    unitIndex === 0 ? Math.round(value).toString() : value.toFixed(value < 10 ? 1 : 0)

  return `${formatted} ${units[unitIndex]}`
}
