import TagsHero from "@/components/tags/TagsHero";
import TagsList from "@/components/tags/TagsList";
import { getAllTags } from "@/sanity/lib/queries";

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <>
      <TagsHero />
      <TagsList tags={tags} />
    </>
  );
}
