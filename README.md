# Create Markdown Post

Create Markdown Post for blog and website using Mustache Template System.

> Under Development and Testing Stage

## Features

- Express.js for Server and API
- Mustache.JS for Template
- Slugify for Generate SEO Friedly Filename and Slug
- Auto Date Generation
- Handlebar for HTML Template page
- CSRF Token - <https://expressjs.com/en/resources/middleware/csurf.html>
- axios HTTP Client for Post data
- HTTP basic auth - <https://github.com/LionC/express-basic-auth>
- Bulma CSS Framework
- Express Validator

## Development and usage

- Clone or Download the repo

```sh
git clone https://github.com/mskian/create-markdown-post.git
cd create-markdown-post
yarn
```

- Start the Dev server

```sh
yarn dev
```

- Start the Production Server

```sh
yarn start
```

- Post New Content

```sh
http://localhost:3005/
```

- Post via API - it Require Basic HTTP Auth - Update password in `config.js` file

```sh
http://localhost:3005/api?title=This%20is%20Example%20Post%20title&description=This%20is%20Example%20Post%20Meta%20Description%20-%20post%20via%20HTTP%20Client%20via%20API.&postcontent=This%20is%20Example%20Post%20Meta%20Description%20-%20post%20via%20HTTP%20Client%20via%20API.&tag=Test
```

- if you want to update HTTP auth username find this line `users: { 'admin':sitedata.password },` in `index.js` - Default username `admin` and password `123456789`

## Modification

- Modify the Post template Content data on `index.js`
- Add storage path, Markdown Extension, Password and Manual URL Slug Generation Name in `config.json`
- if you want add custom slug in Markdown File - `template.md`

```md
---
title: "{{title}}"
date: {{date}}
description: "{{description}}"
tags:
  - "{{tag}}"
slug: "{{seo_url}}"
---

{{postcontent}}

```

## Others

- Example Post - <https://github.com/mskian/create-markdown-post/tree/main/posts>
- Modify Template Content data - <https://github.com/mskian/create-markdown-post/blob/bbaa5118d5910f5f8452fdbc5983034f233f7ba5/index.js#L102>
- HTTP Username - <https://github.com/mskian/create-markdown-post/blob/bbaa5118d5910f5f8452fdbc5983034f233f7ba5/index.js#L125>

## LICENSE

MIT
