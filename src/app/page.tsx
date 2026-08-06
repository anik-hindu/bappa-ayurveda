import { Badge } from "@/components/ui/";
import { SparklesIcon } from "@heroicons/react/24/outline";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Bappa Ayurveda",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div id="main-content" tabIndex={-1} className="space-y-8 text-center">
        <h1 className="text-hero text-text-primary">Bappa Ayurveda</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge>Ayurveda</Badge>

          <Badge variant="accent">Featured</Badge>

          <Badge icon={<SparklesIcon className="size-4" />}>New</Badge>

          <Badge variant="outline">Verified</Badge>
        </div>
      </div>
    </main>
  );
}
