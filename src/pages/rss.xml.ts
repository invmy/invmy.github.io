
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "astro:env/client";
import { i18n } from "astro:config/client";

export async function GET(context) {
    const posts = (await getCollection("posts"))
        .sort((a, b) => new Date(b.data.created).getTime() - new Date(b.data.created).getTime());
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: SITE_URL,
        // trailingSlash: true,
        items: posts.map((post) => {
            const categoryId = post.data.category?.id || "general";
            const slug = post.data.slug || "post";

            return {
                link: `${SITE_URL}/p/${slug}`,
                title: post.data.title || "Untitled",
                description: post.data.description || "",
                pubDate: new Date(post.data.created || post.data.published || post.data.updated || Date.now()),
                categories: categoryId ? [categoryId] : [],
                author: post.data.author?.username,
                content: post.data.body || "",
            };
        }),
        customData: `<language>${i18n?.defaultLocale}</language>`,
    });
}