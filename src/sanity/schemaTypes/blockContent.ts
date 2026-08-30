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
            title: "Smart Link",

            options: {
              modal: {
                type: "popover",
                width: 1,
              },
            },

            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",

                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https"],
                    allowRelative: true,
                  }),
              }),

              defineField({
                name: "type",
                title: "Link type",
                type: "string",

                options: {
                  list: [
                    { title: "Auto", value: "auto" },
                    { title: "Internal", value: "internal" },
                    { title: "External", value: "external" },
                  ],
                },

                initialValue: "auto",
              }),

              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: true,
              }),

              defineField({
                name: "affiliate",
                title: "Affiliate link",
                type: "boolean",
                initialValue: false,

                description:
                  "Enable for links that generate commission or affiliate revenue.",
              }),

              defineField({
                name: "sponsored",
                title: "Sponsored link",
                type: "boolean",
                initialValue: false,

                description: "Enable for paid or sponsored relationships.",
              }),
            ],

            preview: {
              select: {
                href: "href",
                type: "type",
                affiliate: "affiliate",
                sponsored: "sponsored",
              },

              prepare({ href, type, affiliate, sponsored }) {
                const labels = [
                  type === "internal"
                    ? "Internal"
                    : type === "external"
                      ? "External"
                      : "Auto",
                  affiliate ? "Affiliate" : null,
                  sponsored ? "Sponsored" : null,
                ].filter(Boolean);

                return {
                  title: href,
                  subtitle: labels.join(" • "),
                };
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
