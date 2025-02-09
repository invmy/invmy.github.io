# 开始

在不足1GB的硬盘再部署docker坏境连镜像都拉不下来更别说部署了

主要是硬盘太小，内存配置是完全足够的，0.14欧的机子作为，每个月1块钱，体验全云端的密码管理。

结果预览

<img src="https://cdn.jsdelivr.net/gh/invmv/invmv.github.io/img/blog/1739007188-caddy-Vaultwarden-htop.png">


# 需要的东西
- Alpine Linux
- 域名 (Vaultwarden仅支持Https访问，需要证书)
- cloudflare? 应该不是必须

# 部署 Vaultwarden

 `apk add vaultwarden` 

可直接部署到系统

`rc-update add vaultwarden`  

添加程序项

#  Vaultwarden - web

这个部署是不带web文件的，

`/usr/share/webapps/vaultwarden-web` 

里面只有一些样板文件，无法使用。先删除，使用命令

`rm -r /usr/share/webapps/vaultwarden-web/*`


需要前往获取最新的web文件
https://github.com/czyt/vaultwarden-binary/releases

```
mkdir va
cd va
#链接会过期，自行替换成最新版链接
wget https://github.com/czyt/vaultwarden-binary/releases/download/1.33.1-extracted/vaultwarden-linux-amd64-extracted.zip

#解压
unzip *.zip

#复制web
cp -r web-vault/* /usr/share/webapps/vaultwarden-web/
```

# 启动 Vaultwarden

准备admin的token，备用

```
vaultwarden hash
```
按要求输入大于八位数的密码，获得`ADMIN_TOKEN='$argon2id$v=19$m=65540,t=3,p=4$n1kWQ'`

编辑 vi /etc/conf.d/vaultwarden 文件
```
vi /etc/conf.d/vaultwarden
输入i进入编辑模式
# WEB_VAULT_ENABLED改为true 
# 最后一行加入export ADMIN_TOKEN=''
按esc退出编辑，输入 :wq 保存并退出
```

接下来就可以启动了

`rc-service vaultwarden start`  支持 start/restart/stop

使用`rc-status` 检查是否crashed
使用curl 检测是否成功运行输入 `curl 127.1:8000`

# 域名

使用A或者AAAA，将域名指向你的服务器IP
cloudflare的SSL设置成`完全`更安全。没有证书直接被拦截

# caddy反代并自动https证书

```
apk add caddy
#安装caddy

apk add libcap
# 需要端口管理

rc-update add caddy
#添加至服务项

sudo setcap cap_net_bind_service=+ep $(which caddy)
# 让caddy支持端口管理
```

安装完成后 编辑配置文件`vi /etc/caddy/Caddyfile`

```
{
        admin off
}

a.bb.cc:8443 {
	reverse_proxy :8000
}
```

将`a.bb.cc`改为你的域名。如果使用443，直接删除`:8443`即可

端口 如果不使用cloudflare支持任意端口。请勿使用被占用的端口，其他程序可能会crashed。开机检查`rc-status`
cloudflare只支持部分端口，参见 [cloudflare](https://developers.cloudflare.com/fundamentals/reference/network-ports/)

修改完保存，再执行`caddy fmt --overwrite /etc/caddy/Caddyfile` 格式化一下caddyfile

手动start可能会出现未知的BUG，直接`reboot` 。

重启之后`cat /var/log/messages`查看系统log。开机检查`rc-status`

无问题应该可以使用域名+端口进行访问了。

# 配置 Vaultwarden

访问路径 `/admin` 进入后台管理，官方文档 https://github.com/dani-garcia/vaultwarden/wiki/Configuration-overview

# 备份 

`/var/lib/vaultwarden/` 备份整个文件夹 

`/etc/conf.d/vaultwarden` admin配置文件，重新部署需要。

# enjoy