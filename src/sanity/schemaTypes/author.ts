import { defineArrayMember, defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      placeholder: "e.g. BAMS Student, Ayurveda Writer",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "shortBio",
      title: "Short Biography",
      description:
        "A concise description used on author cards and other compact UI.",
      type: "string",
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      description: "Full biography displayed on the author detail page.",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "expertise",
      title: "Areas of Expertise",
      description: "Short, manually curated areas of subject expertise.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "isActive",
      title: "Active",
      description: "Controls whether this author appears publicly.",
      type: "boolean",
      initialValue: true,
    }),
    
    defineField({
      name: "featuredOnHomepage",
      title: "Featured on Homepage",
      description:
        "Controls whether this author appears in the homepage team section.",
      type: "boolean",
      initialValue: false,
    }),
    
    defineField({
      name: "displayOrder",
      title: "Display Order",
      description:
        "Lower numbers appear first. Use increments such as 10, 20, 30.",
      type: "number",
      initialValue: 10,
      validation: (Rule) => Rule.required().integer().min(0),
    }),

  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
