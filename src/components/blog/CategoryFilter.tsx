import { getAllCategories } from "@/sanity/lib/queries";
import CategoryButtons from "./CategoryButtons";

async function CategoryFilter() {
  const categories = await getAllCategories();
  return <CategoryButtons categories={categories} />;
}

export default CategoryFilter;
