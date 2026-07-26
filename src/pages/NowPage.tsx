import { useEffect } from "react";
import NowBuilding from "@/components/NowBuilding";
import GitHubActivity from "@/components/GitHubActivity";

export default function NowPage() {
  useEffect(() => {
    document.title = "Now | Hariom Acharya";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "What Hariom Acharya is currently building, learning, and working on."
      );
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-20 pb-12">
      <NowBuilding />
      <GitHubActivity />
    </div>
  );
}
