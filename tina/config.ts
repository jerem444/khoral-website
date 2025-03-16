import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "admin"
  },
  media: {
    tina: {
      mediaRoot: "src/assets/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "portfolio",
        label: "Portfolio",
        path: "src/data/portfolio",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titre",
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
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "concerts",
        label: "Concerts",
        path: "src/data/concerts",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: values => "concerts.json",
          },
        },
        fields: [
          {
            type: "object",
            name: "concerts",
            label: "Concerts",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.venue} - ${item?.date}`,
              }),
            },
            fields: [
          {
            type: "string",
            name: "venue",
            label: "Salle",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date et heure",
            required: true,
          },
          {
            type: "string",
            name: "city",
            label: "Ville",
            required: true,
          },
          {
            type: "string",
            name: "address",
            label: "Adresse",
          },
          {
            type: "string",
            name: "ticketUrl",
            label: "Lien billetterie",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Image (affiche)",
          },
          {
            type: "number",
            name: "price",
            label: "Prix (€)",
          }
        ]}],
      },
    ],
  },
}); 