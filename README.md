# Cloudflare-DOH

一个简易的DOH服务器，可以部署在CF上，转发Google的DNS服务 (https://dns.google/dns-query) 

CF有自己的DNS服务器 (https://cloudflare-dns.com/dns-query) ，理论上都通过CF的服务器速度应该差不多，但是实际试下来自己部署的DOH就是要快很多



## 特点：

1，可以自定义Token，防止别人盗用 (虽然一般也不会有人盗用这东西，主要是防止Works请求数异常增加)

2，非常轻巧，没有其他多余的功能

3, 别人访问错误的路径，或不带路径直接访问域名的话，会返回一个空白页

4，可以自定义路径并且有缓存功能 (尽量减少Works请求数)



## 部署：

1，有Snippets的尽量在Snippets上部署，没有的就在works上部署

2，将_worker.js里的代码复制粘贴到Snippets或works上，代码开头的变量需要修改一下：

    const AUTH_TOKEN = 'pass';  --这里修改Token，也就是密码；保留单引号
    
    const DOH_PATH = '/dns-query';  --这里修改路径，前面的“/"要保留，如果直接访问域名是一个伪装页，只有使用正确的路径才能使用DOH服务；保留单引号
    
    const ENABLE_CACHE = true;  --true/false，用来开启/关闭缓存功能 (一般开着就行了，不用改)
    
3，绑定你的域名


## 使用：

1，可以在代理客户端 (例如v2ray)中使用，也可以在浏览器中使用 (浏览器中就是一个普通的DOH，没有代理功能)

2，完整的地址：https://域名/路径?token=密码

    例如：https://666.xyz/dns-query?token=pass
    

## 测试：

1，在代理客户端中测试：SNI使用被墙的works域名，然后ECH填入： `cloudflare-ech.com+https://域名/路径?token=密码`，然后测试真连接

2，在浏览器中测试：关闭代理 (一定要关闭代理，不然无法测试)，在浏览器的选项里找到“安全DNS”，选择自定义服务，地址填入`https://域名/路径?token=密码`，然后打开这两个网址查看：
    https://tls-ech.dev/    https://defo.ie/ech-check.php

