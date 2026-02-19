"use client"

import * as React from "react"
import { FiltersPanel } from "./filters-panel"
import Image from "next/image";
import { MapCard } from "@/components/map-card";
import Link from "next/link";


export const toSlug = (text: string): string => {
  return text
    .replace(/[\(\)]/g, '')       // 1. 괄호 () 제거
    .trim()                       // 2. 앞뒤 공백 제거
    .replace(/\s+/g, '-')         // 3. 공백을 대시(-)로 변경
    .replace(/[^\w\-]+/g, '')     // 4. 영문, 숫자, 대시, 언더바 외 모든 특수문자 제거
    .replace(/\-\-+/g, '-')       // 5. 중복된 대시(--)를 단일 대시(-)로 변경
    .replace(/^-+/, '')           // 6. 시작 부분의 대시 제거
    .replace(/-+$/, '');          // 7. 끝 부분의 대시 제거
};

export function MainLayout({
  maps
}) {
  // 타일셋: 기본 전부 ON
  const tilesetKeys = ["jungle", "badlands", "space", "twilight", "desert", "ice", "ash"] as const
  type TileKey = (typeof tilesetKeys)[number]

  const initialTiles = React.useMemo(
    () => Object.fromEntries(tilesetKeys.map((k) => [k, true])) as Record<TileKey, boolean>,
    []
  )
  const [tiles, setTiles] = React.useState<Record<TileKey, boolean>>(initialTiles)

  // 플레이어 수: 2~8 기본 전부 ON
  const playerKeys = [2, 3, 4, 5, 6, 7, 8] as const
  type PlayerKey = (typeof playerKeys)[number]

  const initialPlayers = React.useMemo(
    () => Object.fromEntries(playerKeys.map((k) => [k, true])) as Record<PlayerKey, boolean>,
    []
  )
  const [players, setPlayers] = React.useState<Record<PlayerKey, boolean>>(initialPlayers)

  return (
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-[272px] md:shrink-0">
          <FiltersPanel
            tiles={tiles}
            setTiles={setTiles}
            resetTiles={() => setTiles(initialTiles)}
            players={players}
            setPlayers={setPlayers}
            resetPlayers={() => setPlayers(initialPlayers)}
          />
        </div>

        {/* 우측(하단) 콘텐츠: 남은 폭 전부 사용 */}
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {maps.map((map) => (
              <MapCard
                key={map.id}
                className="group relative aspect-square overflow-hidden bg-card"
              >
                <Link
                  key={map.id}
                  href={`/maps/${toSlug(map.title)}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-ring"
                >
                {/* 배경 이미지 (정사각형이 아니어도 여백 없이 cover) */}
                <Image
                  src={map.image_src}
                  alt={map.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={false}
                />

                {/* 하단 라벨 (항상 카드 하단, 높이 32px) */}
                <div className="absolute bottom-0 left-0 flex h-8 w-full items-center justify-between bg-black/50 px-2">
                  <span className="text-sm font-semibold text-white truncate">
                    {map.title}
                  </span>
                  <span className="text-sm font-semibold text-white shrink-0">
                    {map.valueText}
                  </span>
                </div>
                </Link>
              </MapCard>
            ))}
          </div>
        </div>
      </div>
  )
}
