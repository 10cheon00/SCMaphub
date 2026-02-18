import { MapLog } from "@/components/map-log";

export default function Page() {
  return (
    <div>
      <p className="p-8 text-3xl font-semibold">
        asdfasdf
      </p>
      <MapLog
        imageSrc="/maps/sample-1.png"
        version="1.4"
        updatedAtText="1970년 2월 3일"
        fileName="filename.scx"
        fileSizeText="1.4Kb"
        title="Heading"
        subtitle="Subheading"
        description="Body text for your whole article or post..."
      />
      <MapLog
        imageSrc="/maps/sample-1.png"
        version="1.4"
        updatedAtText="1970년 2월 3일"
        fileName="filename.scx"
        fileSizeText="1.4Kb"
        title="Heading"
        subtitle="Subheading"
        description="Body text for your whole article or post..."
      />
      <MapLog
        imageSrc="/maps/sample-1.png"
        version="1.4"
        updatedAtText="1970년 2월 3일"
        fileName="filename.scx"
        fileSizeText="1.4Kb"
        title="Heading"
        subtitle="Subheading"
        description="Body text for your whole article or post..."
      />
    </div>
  );
}
