import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "article",
        label: "Articles",
        path: "src/content/articles",
        format: "md",
        ui: {
            filename: {
                // if disabled, the editor can not edit the filename
                readonly: false,
                // Example of using a custom slugify function
                slugify: (values) => {
                    // Values is an object containing all the values of the form.
                    return `${values?.title?.toLowerCase().replace(/ /g, '-')}`
                },
            },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtitle",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true,
          },
          {
            type: "image",
            name: "imageSrc",
            label: "Featured Image",
            required: true,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Alt Text for Featured Image",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Published Date",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
                component: "tags",
                min: 1,
            },
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        format: "json",
        fields: [
            {
                type: "string",
                name: "name",
                label: "Name",
                isTitle: true,
                required: true,
            },
            {
                type: "image",
                name: "image",
                label: "Image",
                required: true,
            },
            {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
            }
        ]
      },
    ],
  },
});
