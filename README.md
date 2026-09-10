## 中文

当前版本为github Discussions内容cms版本。只修改了一点点，将内容管理全部迁移到了github Discussions上，轻松修改和发布博客。支持评论系统和获取第一张图做封面

https://github.com/mattbrailsford/github-discussions-blog-loader 的内容加载器目前对中文的支持不太友好，创建标签无法使用中文。但你可以使用英文是正常的

创建新的category请使用带锁头的Announcement，目前section并没有什么用。请删除其他没有带锁头的分类，防止其他用户添加

### env环境变量
与正常版本部署并无区别，只是需要配置一些env
- `SECRET_GITHUB_ACCESS_TOKEN` 需要在[PAT](https://github.com/settings/personal-access-tokens)里面创建
- `PUBLIC_GITHUB_REPO_NAME` github Discussions的仓库名
- `PUBLIC_GITHUB_REPO_OWNER` github Discussions的拥有者
- `PUBLIC_GITHUB_REPO_ID` 在 https://giscus.app/zh-CN 里获取 data-repo-id
- `NPM_CONFIG_LEGACY_PEER_DEPS` 设置为`TRUE` 某些只能使用npm包需要配置，但是开发个人推荐使用BUN作为包管理器

无论是构建还是开发都需要配置以上env环境变量

同时你还需要在src/content/authors配置一个资料否则构建或启动会失败

## 快速启动

点击右上角的以模板创建到新仓库。名称需要为 `用户名.github.io` 然后进入settings开启github Discussions和github pages从github action中部署，随后进入Action中，运行构建脚本，不用配置任何环境变量。github action会搞定一切

当然你需要部署到cloudflare或者其他serverless pages平台上还是需要创建以上环境变量

## english
The current version is the GitHub Discussions content management system (CMS) version.