import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || '',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: "admin",
    publicFolder: "public",
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
        name: "photos",
        label: "Photos",
        path: "src/data/photos",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: values => "photos.json",
          },
        },
        fields: [
          {
            type: "object",
            name: "photos",
            label: "Photos",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.title} - ${item?.date}`,
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "datetime",
                name: "date",
                label: "Date",
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
            ]
          }],
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
                ui: {
                  dateFormat: "YYYY-MM-DD",
                  timeFormat: "HH:mm"
                }
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
            ]
          }],
      },
      {
        name: "videos",
        label: "Vidéos",
        path: "src/data/videos",
        format: "json",
        ui: {
          filename: {
            readonly: true,
            slugify: values => "videos.json",
          },
        },
        fields: [
          {
            type: "object",
            name: "videos",
            label: "Vidéos",
            list: true, // Permet d'ajouter plusieurs vidéos
            ui: {
              itemProps: (item) => ({
                label: item?.title, // Affiche le titre de la vidéo dans la liste
              }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titre",
                required: true,
              },
              {
                type: "datetime",
                name: "date",
                label: "Date",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL de la vidéo YouTube",
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
        ],
      }
    ],
  },
}); 