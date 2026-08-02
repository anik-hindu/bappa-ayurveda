import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { category } from "./category";
import { post } from "./post";
import { blockContent } from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, blockContent, post],
};
