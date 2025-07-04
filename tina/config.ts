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
        name: "concert",
        label: "Concerts",
        path: "src/data/concerts",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date ? new Date(values.date) : new Date();
              const dateStr = date.toISOString().split('T')[0];
              const venue = values.venue ? values.venue.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
              return `${dateStr}-${venue}`;
            },
          },
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
      },
      {
        name: "video",
        label: "Vidéos",
        path: "src/data/videos",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              const date = values.date ? new Date(values.date) : new Date();
              const dateStr = date.toISOString().split('T')[0];
              const title = values.title ? values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
              return `${dateStr}-${title}`;
            },
          },
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
      {
        name: "album",
        label: "Albums",
        path: "src/data/albums",
        format: "json",
        fields: [
          {
            name: "name",
            label: "Nom de l’album",
            type: "string",
            required: true,
          },
          {
            name: "releaseDate",
            label: "Date de sortie",
            type: "datetime",
            required: true,
          },
          {
            name: "coverImage",
            label: "Image de couverture",
            type: "image",
            required: true,
          },
          {
            name: "bandCampId",
            label: "id Bandcamp",
            type: "string",
            required: true,
          }
        ],
      },
    ],
  },
});