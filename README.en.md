<div align="center">

<h1 align="center">ChatGPT Next.JS</h1>

Use as the official ChatGPT, with even more powerful features.

[Demo](https://chatgpt.younglele.cn) / [Discord](https://discord.gg/2wcQRJKxuZ) / [中文 README](./README.md)

![主界面](./static/home.jpeg)

</div>

## Feature

- Same UI as the official version, responsive design, and support for dark mode.
- Built-in `Prompt` list,，[Chinese Prompt](https://github.com/PlexPt/awesome-chatgpt-prompts-zh) and [English Prompt](https://github.com/f/awesome-chatgpt-prompts)
- One-click translation of `Prompt` to English (English is recommended for more accurate results)
- Use `Firebase` storage data
- Use `next-auth` login authentication
- i18n
- Free `key` is currently available.

## To be implemented

- [ ] Custom `Prompt`
- [ ] Export conversation as `Markdown`
- [ ] Add custom `key`
- [ ] More options for selecting a `model`
- [ ] More optional role information

## Issue

Upgraded to Vercel Pro, now the timeout is 60s.

❗ ~~The project is deployed on Vercel. As a hobby user, _the Serverless Function Execution Timeout (Seconds)_ is 10s ([general limit](https://vercel.com/docs/concepts/limits/overview)). Therefore, when the API response time exceeds 10s, no message will be returned and a 504 timeout error will be displayed.~~

## How to use

### Create environment variables file

Create a file named **".env.local "** in the root directory

```shell
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_SECRET=ThisIsASuperSecretAuth
OPENAI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_KEY=
```

### Get OPENAI_API_KEY

Get `OPENAI_API_KEY` from the [openai platform](https://platform.openai.com/account/api-keys)

### Get GOOGLE_ID and GOOGLE_SECRET Via Firebase

1. Create a project using [Firebase](https://console.firebase.google.com)
2. Jump to the **Authentication** directory
3. Click on the Sign-in method tab
4. Select Google and save
5. The ID and key in the Web SDK configuration correspond to **GOOGLE_ID** and **GOOGLE_SECRET** respectively

### Get FIREBASE_SERVICE_ACCOUNT_KEY

1. Enter the project settings
2. Under the service account tab, click Generate new private key
3. Open the [textfixer](https://www.textfixer.com/tools/remove-line-breaks.php) website
4. Copy the contents of the downloaded file into the input box to get the private key without line breaks
5. This private key is the `FIREBASE_SERVICE_ACCOUNT_KEY` that you will eventually use.

### Modify the Firebase configuration

1. open project settings
2. Create the web application under the General tab
3. Replace the corresponding part of the "firebase.ts" file with the firebaseConfig object from the SDK obtained after successful creation

### Create a Firebase database

Open the Firestore Database directory 2. Click Create to create the database

### Add Google login authentication

1. Login to [google cloud console](https://console.cloud.google.com/)
2. Select the project you created in Firebase (you can find it by searching without showing it)
3. Click API and Services -> Credentials
4. Select the OAuth2.0 client ID
5. Add the url to be authorized to the redirected url

![](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230310-ejx.png)

### Start project

```shell
npm install

npm run dev
```

## Sponsorship

Just give a 'Star' ⭐ and that's all.

## Screen Shots

![home](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v2w.png)
![prompt](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v36.png)
![chat](https://obsidian-picgo-le.oss-cn-hangzhou.aliyuncs.com/img/SCR-20230325-v3n.png)
