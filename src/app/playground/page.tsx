import type { JSX } from "react";

function Playground(): JSX.Element {
  return (
    <>
      <h1 className="mt-8 text-center text-5xl">Design System</h1>
      <div className="container mx-auto mt-8 flex h-96 w-96 flex-col gap-4">
        <div className="rounded-button h-full w-full border bg-rose-100"></div>
        <div className="rounded-card h-full w-full border bg-rose-100"></div>
        <div className="rounded-badge h-full w-full border bg-rose-100"></div>
        <div className="h-full w-full rounded-lg border bg-rose-100"></div>
        <div className="h-full w-full rounded-md border bg-rose-100"></div>
      </div>
    </>
  );
}

export default Playground;
