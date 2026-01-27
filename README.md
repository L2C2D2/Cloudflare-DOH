# Cloudflare-DOH

一个简易的DOH服务器，可以部署在CF上，转发Google的DNS服务 (https://dns.google/dns-query)  ，可以用于ECH代理


## 特点：

1，可以自定义Token，防止别人盗用 (虽然一般也不会有人盗用这东西，主要是防止Works请求数异常增加)

2，非常轻巧，除了伪装页之外没有其他的功能

3，可以自定义路径并且有缓存功能 (尽量减少Works请求数)



## 部署：

1，有Snippets的尽量在Snippets上部署，没有的就在works上部署

2，在CF上部署代码 (代码开头的变量需要修改一下)：

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

2，在浏览器中测试：关闭代理 (一定要关闭代理，不然无法测试)，在浏览器的选项里找到“安全DNS”，选择自定义服务，地址填入`cloudflare-ech.com+https://域名/路径?token=密码`，然后打开这两个网址查看：
    https://tls-ech.dev/    https://defo.ie/ech-check.php

