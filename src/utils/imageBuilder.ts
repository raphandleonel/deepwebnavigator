import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);
