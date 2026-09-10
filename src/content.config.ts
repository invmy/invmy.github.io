import { glob } from "astro/loaders"
import { defineCollection, reference } from "astro:content"
import { z } from "astro/zod"
import { githubDiscussionsBlogLoader } from "github-discussions-blog-loader";

const authors = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/authors",
  }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.url().or(z.string().startsWith("/")),
    bio: z.string().optional(),
    mail: z.email().optional(),
    socials: z.record(z.string(), z.url()).optional(),
  }),
})

export const blog = defineCollection({
  loader: githubDiscussionsBlogLoader({
    auth: import.meta.env.SECRET_GITHUB_ACCESS_TOKEN,
    repo: {
      name: import.meta.env.PUBLIC_GITHUB_REPO_NAME,
      owner: import.meta.env.PUBLIC_GITHUB_REPO_OWNER,
    },
    mappings: {
      tagLabelPrefix: "",
      seriesLabelPrefix: "",
    }
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional().default(""),

      date: z.coerce.date().nullish().catch(undefined),

      order: z.number().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(reference("authors")).optional(),

      image: image().optional(),
      draft: z.boolean().optional(),

      readingTime: z.string().optional(),
      published: z.coerce.date().optional(),
      created: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),

      githubUrl: z.string(),
      githubDiscussionId: z.string(),
      githubDiscussionNumber: z.number(),
      author: z.union([
        z.object({
          avatarUrl: z.string(),
          username: z.string(),
          url: z.string(),
        }),
        z.array(
          z.object({
            avatarUrl: z.string(),
            username: z.string(),
            url: z.string(),
          })
        ),
      ]).optional(),
      category: z.union([
        z.object({
          id: z.string(),
          name: z.string(),
        }),
        z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          })
        ),
      ]).optional(),
    })
      .transform((data) => {
        const rawAuthors = [data.authors ?? data.author].flat().filter(Boolean);
        const finalAuthors = rawAuthors.length > 0
          ? rawAuthors.map((a: any) => ({
            collection: "authors" as const,
            id: (typeof a === 'string' ? a : a?.username) || "ghost",
          }))
          : [{ collection: "authors" as const, id: "ghost" }];


        const finalDate = data.date || data.published || data.updated || data.created;

        if (!finalDate) {
          throw new Error(`构建失败：文章 "${data.title}" 缺失有效的日期 (date/published/updated/created)`);
        }

        return {
          ...data,
          date: finalDate,
          authors: finalAuthors,
        };
      })
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/content/projects",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      link: z.url(),
      tags: z.array(z.string()).optional(),
      image: image().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
})

export const collections = { blog, authors, projects }
