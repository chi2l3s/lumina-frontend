import { APP_URL } from "@/lib/constants/env";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard'
        },
        sitemap: APP_URL + '/sitemap.xml'
    }
}