import type { Graph, Thing } from "schema-dts";

export function buildGraph(nodes: Thing[]): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export * from "./about";
export * from "./article";
export * from "./breadcrumb";
export * from "./collection-page";
export * from "./defined-term";
export * from "./ids";
export * from "./item-list";
export * from "./organization";
export * from "./person";
export * from "./profile";
export * from "./webpage";
export * from "./website";
export * from "./defined-terms-set";
export * from "./blog-posting";
