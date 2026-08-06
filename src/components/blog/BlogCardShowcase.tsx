import BlogCard from "@/components/blog/BlogCard";
import { Section } from "@/components/ui";
import { getLatestPosts } from "@/sanity/lib/queries";

export default async function BlogCardShowcase() {
  const posts = await getLatestPosts(3);

  if (posts.length === 0) {
    return <p className="text-text-muted">No blog posts available.</p>;
  }

  const post = posts[0];

  return (
    <main className="min-h-screen w-full">
      <h1 className="text-center text-section">Experimental</h1>
      <Section
        container={false}
        className="flex flex-wrap items-center justify-center gap-8"
      >
        {/* Default */}
        <div className="space-y-4">
          <h3>Default</h3>

          <div className="max-w-sm">
            <BlogCard post={post} priority />
          </div>
        </div>

        {/* Without Image */}
        <div className="space-y-4">
          <h3>Without Image</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                mainImage: undefined,
              }}
            />
          </div>
        </div>

        {/* Without Excerpt */}
        <div className="space-y-4">
          <h3>Without Excerpt</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                excerpt: undefined,
              }}
            />
          </div>
        </div>

        {/* Long Title */}
        <div className="space-y-4">
          <h3>Long Title</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                title:
                  "Understanding the Ancient Ayurvedic Principles Behind Modern Scientific Herbal Formulations and Their Role in Preventive Healthcare",
              }}
            />
          </div>
        </div>

        {/* Long Excerpt */}
        <div className="space-y-4">
          <h3>Long Excerpt</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                excerpt:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(
                    12,
                  ),
              }}
            />
          </div>
        </div>

        {/* Missing Category */}
        <div className="space-y-4">
          <h3>Missing Category</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                category: undefined,
              }}
            />
          </div>
        </div>

        {/* Missing Author */}
        <div className="space-y-4">
          <h3>Missing Author</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                author: undefined,
              }}
            />
          </div>
        </div>

        {/* Empty Body */}
        <div className="space-y-4">
          <h3>Empty Body</h3>

          <div className="max-w-sm">
            <BlogCard
              post={{
                ...post,
                body: [],
              }}
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
