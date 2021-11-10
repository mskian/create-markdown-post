# Create Markdown Post

Create Markdown Post for blog and website using Mustache Template System.

> Under Development and Testing Stage

## Usage

- Express.js for Server and API
- Mustache.JS for Template
- Slugify for Generate SEO Friedly Filename and Slug
- Auto Date Generation
- Handlebar for HTML Template page

## Development

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

- Post API Example

```sh
curl --request POST \
  --url http://localhost:3005/ \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'title=Example Post' \
  --data 'postcontent=Example Post - Example Blog Post via cURL.' \
  --data 'tag=Hello World' \
  --data 'description=Post Content - Hello World Blog.'
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_PORT => "3005",
  CURLOPT_URL => "http://localhost:3005/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "title=Example%20Post&postcontent=Example%20Post%20-%20Example%20Blog%20Post%20via%20cURL.&tag=Hello%20World&description=Post%20Content%20-%20Hello%20World%20Blog.",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/x-www-form-urlencoded"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

## Modification

- Modify the Post template Content data on `index.js`
- Add storage path, Markdown Extension and Manual URL Slug Generation Name in `config.json`
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

## LICENSE

MIT
