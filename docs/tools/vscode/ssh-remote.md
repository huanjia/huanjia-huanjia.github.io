# 安装 vscode 插件 Remote SSH | SFTP

- Remote SSH 配置远程服务器
- SFTP 本地项目中配置上传远程地址

## 生成 SSH 密钥对（若不存在的话）

```shell
ssh-keygen -C "your email address"
```

生成的密钥对被保存在本地的 C:\Users\你的用户名\.ssh 目录下，生成的密钥对包括私钥 id_rsa 和公钥 id_rsa.pub，我们需要将公钥中的内容添加到远程服务器。

## 将 SSH 公钥添加到远程服务器

```shell
ssh-copy-id user_name@server_ip
```

输入上述命令以及远程服务器的登陆密码，将在远程服务器的 `~/.ssh` 目录下创建 `authorized_keys` 文件（若不存在得话），并将本地 SSH 公钥中的内容添加到该文件中。此后，任何从本地发起的指向远程服务器的 SSH 连接请求（如登陆、scp 文件传输等）将不再需要输入登陆密码。
