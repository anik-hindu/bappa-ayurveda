import { defineArrayMember, defineField, defineType } from "sanity";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "object",

  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Frequently asked questions",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",

          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) =>
                Rule.required().min(10).max(180),
            }),

            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],

          preview: {
            select: {
              title: "question",
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(2).max(10),
    }),
  ],

  preview: {
    select: {
      title: "heading",
      count: "items.length",
    },

    prepare({ title, count }) {
      return {
        title: title || "Frequently Asked Questions",
        subtitle: `${count ?? 0} questions`,
      };
    },
  },
});