import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",

  of: [
    defineArrayMember({
      type: "block",

      styles: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Heading 2",
          value: "h2",
        },
        {
          title: "Heading 3",
          value: "h3",
        },
        {
          title: "Heading 4",
          value: "h4",
        },
        {
          title: "Quote",
          value: "blockquote",
        },
      ],

      lists: [
        {
          title: "Bullet",
          value: "bullet",
        },
        {
          title: "Numbered",
          value: "number",
        },
      ],

      marks: {
        decorators: [
          {
            title: "Bold",
            value: "strong",
          },
          {
            title: "Italic",
            value: "em",
          },
          {
            title: "Highlight",
            value: "highlight",
          },
        ],

        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "External Link",

            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",

                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https"],
                    allowRelative: false,
                  }),
              }),

              defineField({
                name: "blank",
                title: "Open in new tab",
                type: "boolean",
                initialValue: true,
              }),
            ],

            preview: {
              select: {
                title: "href",
              },
            },
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Article Image",

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",

          description: "Describe the image for readers who cannot see it.",

          validation: (Rule) => Rule.required().max(200),
        }),

        defineField({
          name: "caption",
          title: "Caption",
          type: "string",

          description: "Optional caption displayed below the image.",

          validation: (Rule) => Rule.max(200),
        }),
      ],

      validation: (Rule) => Rule.required(),
    }),
    defineArrayMember({
      type: "faqSection",
    }),
  ],
});
