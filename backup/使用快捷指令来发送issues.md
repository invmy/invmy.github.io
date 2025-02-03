# 文档

https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue

# Token
https://github.com/settings/personal-access-tokens
在此创建一个token，权限需要```Issue```

# 成品
https://www.icloud.com/shortcuts/b777423324b6470aa210928853be9e5f

需要自行修改一下配置即可使用

# 手动创建步骤

- 添加 ```请求输入``` 提示设为 ```标题``` 并不允许换行
- 添加 ```设定变量```  设定为 ```title```
- 添加 ```请求输入``` 提示设为 ```正文``` 
- 添加 ```设定变量```  设定为 ```body```
- 添加  ```获取URL内容``` URL设置为 ```https://api.github.com/repos/<owner>/<repo>/issues``` <owner>/<repo>处需要用户名和仓库名替换掉

方法 ```POST```
头部
```
- Accept: application/vnd.github+json
- Authorization: Bearer <YOUR-TOKEN>
- X-GitHub-Api-Version: 2022-11-28
```
请求体 ```JSON```

- 添加 文本 ```title``` 值为 ```设定变量title```
- 添加 文本 ```body``` 值为 ```设定变量body```
- 添加 数组 ```labels``` 值为 ```文本``` 会出现```项目1 ```文本值为标签，需要多个标签则再添加一个```文本```


最后添加一个```显示结果```，尝试运行一下

如正常出现一大串则成功，如果长时间未响应，可能无法访问api.github.com