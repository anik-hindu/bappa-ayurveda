import { defineArrayMember, defineField, defineType } from "sanity";

export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",

  fields: [
    defineField({
      name: "headerRows",
      title: "Header rows",
      type: "number",
      initialValue: 1,
      validation: (Rule) => Rule.required().integer().min(0),
    }),

    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "row",
          title: "Row",
          type: "object",

          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [
                defineArrayMember({
                  name: "cell",
                  title: "Cell",
                  type: "object",

                  fields: [
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "array",
                      of: [
                        defineArrayMember({
                          type: "block",

                          styles: [{ title: "Normal", value: "normal" }],

                          lists: [],

                          marks: {
                            decorators: [
                              { title: "Bold", value: "strong" },
                              { title: "Italic", value: "em" },
                            ],

                            annotations: [
                              defineArrayMember({
                                name: "link",
                                type: "object",
                                title: "Link",

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
                                ],
                              }),
                            ],
                          },
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
