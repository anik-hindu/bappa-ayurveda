import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage | Bappa Ayurveda",
};

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center"
      tabIndex={-1}
    >
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold">Bappa Ayurveda</h1>
        <p className="text-dark/70 text-lg">
          Foundation Sprint : <strong>Completed</strong>
        </p>
        <div className="bg-accent mx-auto h-px w-16" />
      </div>
    </main>
  );
}
