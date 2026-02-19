import { MainLayout } from "./main";
import { supabase } from "@/lib/supabase";

export default async function Page() {
  const { data, error } = await supabase.from("map_data").select("*");

  return (
    <div className="p-8">
      <MainLayout maps={data}></MainLayout>
    </div>
  );
}
