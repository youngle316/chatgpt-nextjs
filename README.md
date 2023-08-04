💥 本项目不更新了，请移步至 [power-chatgpt](https://github.com/youngle316/power-chatgpt)

<div align="center">

<h1 align="center">ChatGPT Next.JS</h1>

像官方 `ChatGPT` 一样使用，再加入更强大的功能

[English README](./README.en.md)

![主界面](./static/home.jpeg)

</div>

## 功能

- 与官方相同的 `UI`，响应式设计，支持深色模式
- 内置 `Prompt` 列表，[中文 Prompt](https://github.com/PlexPt/awesome-chatgpt-prompts-zh) 和 [英文 Prompt](https://github.com/f/awesome-chatgpt-prompts)
- 一键翻译 `Prompt` 为英文（推荐使用英文，返回的更准确）
- 使用 `Firebase` 存储数据
- 使用 `next-auth` 登录验证
- i18n

## 待实现

- [x] 自定义 `Prompt`
- [ ] 导出对话为 `Markdown`
- [ ] 添加自定义 `key`
- [ ] 更多的 `model` 选择
- [ ] 更多可选的角色信息

## 问题

~~升级到了 Vercel Pro，超时时间现在为 60s 了~~

❗ ~~项目部署在 Vercel 上，由于我是 hobby 用户，_the Serverless Function Execution Timeout (Seconds)_ 是 10s ([一般限制](https://vercel.com/docs/concepts/limits/overview))，所以当 api 响应时间超过 10s 后，就不会返回任何消息，显示 504 超时~~

## 如何使用

### 创建 环境变量 文件

在根目录下创建一个名为 **".env.local"** 的文件

```shell
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_SECRET=ThisIsASuperSecretAuth
OPENAI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_KEY=
```

### 获取 OPENAI_API_KEY

在 [openai platform](https://platform.openai.com/account/api-keys) 获取 `OPENAI_API_KEY`

### 通过 Firebase 获取 GOOGLE_ID 和 GOOGLE_SECRET

1.  使用 [Firebase](https://console.firebase.google.com) 创建项目
2.  跳转到 **Authentication** 目录
3.  点击 Sign-in method 页签
4.  选择 Google 并保存
5.  Web SDK 配置中的 ID 和密钥分别对应 **GOOGLE_ID** 和 **GOOGLE_SECRET**

### 获取 FIREBASE_SERVICE_ACCOUNT_KEY

1. 进入项目设置
2. 在服务账号页签下点击生成新的私钥
3. 打开[textfixer](https://www.textfixer.com/tools/remove-line-breaks.php)网站
4. 将下载的文件中的内容复制到输入框中获取没有换行符的私钥
5. 这个私钥就是最终要使用的 `FIREBASE_SERVICE_ACCOUNT_KEY`

### 修改 Firebase 配置

1. 打开项目设置
2. 在常规页签下创建 Web 应用
3. 将创建成功后获取的 SDK 中的 firebaseConfig 对象替换 "firebase.ts" 文件中的对应部分

### 创建 Firebase 数据库

1. 打开 Firestore Database 目录
2. 点击创建创建数据库

### 添加 Google 登录验证

1. 登录 [google cloud console](https://console.cloud.google.com/)
2. 选择你在 Firebase 创建的项目（不显示可以进行搜索就可以找到）
3. 点击 API 和服务 -> 凭证
4. 选择 OAuth2.0 客户端 ID
5. 将需要授权的 url 添加到重定向的 url

![](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230310-ejx.png)

### 启动项目

```shell
npm install

npm run dev
```

## 赞助

给个 `Star` ⭐ 就行了

## 屏幕截图

![home](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v2w.png)

![prompt](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v36.png)

![chat](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v3n.png)
