import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { blockContent } from "./blockContent";
import { category } from "./category";
import { faqSection } from "./faqSection";
import { post } from "./post";
import { tag } from "./tag";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, faqSection, blockContent, post, tag],
};
