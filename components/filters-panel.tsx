"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RotateCcw } from "lucide-react"

type TileKey = "jungle" | "badlands" | "space" | "twilight" | "desert" | "ice" | "ash"
type PlayerKey = 2 | 3 | 4 | 5 | 6 | 7 | 8

const TILE_ITEMS: Array<{ key: TileKey; label: string; imgSrc: string }> = [
  { key: "jungle", label: "정글",       imgSrc: "/images/Jungle_64x64_nearest.png" },
  { key: "badlands", label: "배드랜드",  imgSrc: "/images/Badlands_64x64_nearest.png" },
  { key: "space", label: "스페이스",     imgSrc: "/images/Space_64x64_nearest.png" },
  { key: "twilight", label: "트와일라잇",imgSrc: "/images/Twilight_64x64_nearest.png" },
  { key: "desert", label: "데저트",     imgSrc: "/images/Desert_64x64_nearest.png" },
  { key: "ice", label: "아이스",        imgSrc: "/images/Ice_64x64_nearest.png" },
  { key: "ash", label: "애쉬",          imgSrc: "/images/Ash_64x64_nearest.png" },
]

const PLAYER_ITEMS: Array<{ key: PlayerKey; label: string; }> = [
  { key: 2, label: "2인" },
  { key: 3, label: "3인" },
  { key: 4, label: "4인" },
  { key: 5, label: "5인" },
  { key: 6, label: "6인" },
  { key: 7, label: "7인" },
  { key: 8, label: "8인" },
]

export function FiltersPanel(props: {
  tiles: Record<TileKey, boolean>
  setTiles: React.Dispatch<React.SetStateAction<Record<TileKey, boolean>>>
  resetTiles: () => void

  players: Record<PlayerKey, boolean>
  setPlayers: React.Dispatch<React.SetStateAction<Record<PlayerKey, boolean>>>
  resetPlayers: () => void
}) {
  const { tiles, setTiles, resetTiles, players, setPlayers, resetPlayers } = props

  return (
    <Card className="rounded-[12px] border border-primary p-4">
      {/* 패널 내부 컴포넌트 간 간격 32 */}
      <div className="flex flex-col gap-8">
        {/* 타일셋 */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">타일셋</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={resetTiles}
              className="text-primary hover:text-primary/90"
              aria-label="타일셋 초기화"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* 항목(라벨 포함) 간격 16 */}
          <div className="flex flex-col gap-4">
            {TILE_ITEMS.map((item) => (
              <label
                key={item.key}
                className="flex h-6 w-full min-w-[110px] items-center gap-3"
              >
                {/* 체크박스: 체크 시 primary */}
                <Switch
                  checked={tiles[item.key]}
                  onCheckedChange={(v) =>
                    setTiles((prev) => ({ ...prev, [item.key]: Boolean(v) }))
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary "
                />

                {/* 작은 이미지 */}
                <span className="relative h-4 w-4 overflow-hidden rounded-full">
                  <Image src={item.imgSrc} alt="" fill className="object-cover" />
                </span>

                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </section>

        <Separator />

        {/* 플레이어 수 */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">플레이어 수</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={resetPlayers}
              className="text-primary hover:text-primary/90"
              aria-label="플레이어 수 초기화"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {PLAYER_ITEMS.map((item) => (
              <label
                key={item.key}
                className="flex h-6 w-full min-w-[110px] items-center gap-3"
              >
                <Switch
                  checked={players[item.key]}
                  onCheckedChange={(v) =>
                    setPlayers((prev) => ({ ...prev, [item.key]: Boolean(v) }))
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />

                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </Card>
  )
}
