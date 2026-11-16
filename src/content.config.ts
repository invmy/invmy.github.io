import { defineCollection } from "astro:content";
import { githubDiscussionsBlogLoader } from "github-discussions-blog-loader";
import { GITHUB_ACCESS_TOKEN, getSecret } from 'astro:env/server'
import { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } from "astro:env/client";

const posts = defineCollection({
  loader: githubDiscussionsBlogLoader({
    auth: getSecret('GITHUB_ACCESS_TOKEN'),
    repo: {
      owner: GITHUB_REPO_OWNER,
      name: GITHUB_REPO_NAME
    },
    incremental: false,
    mappings: {
      // blogPostCategory?: string,
      // draftLabel?: string,
      // ignoreLabels?: string[],
      tagLabelPrefix: '',
      seriesLabelPrefix: '',
    }
  })
});

export const collections = { posts };