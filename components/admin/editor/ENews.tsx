import { getIfVisible } from "@/lib/eNewsActions";
import ENewsToggle from "./ENewsToggle";

async function ENews() {
  const data = await getIfVisible();

  return (
    <div className="self-start rounded-xl bg-white px-5 py-4 text-sm shadow-sm">
      <ENewsToggle visible={data.visible} />
    </div>
  );
}

export default ENews;
