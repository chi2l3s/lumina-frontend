import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants/seo";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/auth/login",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1F2128",
    theme_color: "#fbd452",
    icons: [
      {
        src: "/touch-icons/256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/touch-icons/512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
