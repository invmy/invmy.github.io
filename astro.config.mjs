// @ts-check
import { defineConfig, envField } from "astro/config"
import sitemap from '@astrojs/sitemap';
import { satteri } from "@astrojs/markdown-satteri";
import satteriCallouts from "satteri-callouts";
import satteriMathml from "satteri-mathml";

const site = process.env.SITE || "http://localhost:4321";
const base = process.env.BASE || "/";

const normalizedBase =
    base === "/" ? "/" : `/${base.replace(/^\/+|\/+$/g, "")}`;
const normalizedSite = site.replace(/\/+$/, "");
const URL =
    normalizedBase === "/"
        ? normalizedSite
        : `${normalizedSite}${normalizedBase}`;

// https://astro.build/config
export default defineConfig({
    site,
    base,
    i18n: {
        defaultLocale: "zh-cn",
        locales: ["en", "fr", "pt-br", "es", "zh-cn"],
    },
    prefetch: {
        prefetchAll: true
    },
    env: {
        schema: {
            SITE_TITLE: envField.string({ context: "client", access: "public", default: "invmy blog's", optional: true }),
            SITE_DESCRIPTION: envField.string({ context: "client", access: "public", default: "this is my blog theme, i am a trader", optional: true }),
            SITE_URL: envField.string({ context: "client", access: "public", default: URL, optional: true }),
            GITHUB_ACCESS_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
            GITHUB_REPO_OWNER: envField.string({ context: "client", access: "public", optional: false }),
            GITHUB_REPO_NAME: envField.string({ context: "client", access: "public", optional: false }),
            GITHUB_REPO_ID: envField.string({ context: "client", access: "public", optional: false }),
        }
    },
    integrations: [sitemap()],
    markdown: {
        processor: satteri({
            features: {
                smartPunctuation: false,
                math: true,
                gfm: {
                    // Default footnote configuration
                    // footnotes: {
                    //     backContent: "↩",
                    //     backLabel: "Back to reference {reference}",
                    //     label: "Footnotes",
                    // },
                },
            },
            mdastPlugins: [
                satteriMathml(),
            ],
            hastPlugins: [
                satteriCallouts(),
            ],
        }),
    },
});
