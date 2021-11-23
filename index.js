const express = require('express');
const fs = require("fs");
const {
    render
} = require("mustache");
const sitedata = require("./config.json");
const slugify = require("slugify");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const {
    check,
    validationResult
} = require('express-validator');
const basicAuth = require('express-basic-auth');

const app = express();
const port = 3005;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.set('views', './views');
app.use(cookieParser());
const csrfProtection = csrf({
    cookie: true
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});

function getCurrentDate(n) {
    return (n < 10 ? "0" : "") + n
}

const date = new Date()
const month = getCurrentDate(date.getMonth() + 1)
const day = getCurrentDate(date.getDate())
const year = date.getFullYear()
const formattedDate = year + "-" + month + "-" + day

app.get('/', csrfProtection, function(req, res) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.render('home', {
        post: {
            title: 'Create New Markdown Post',
            description: 'Create New Markdown Blog Post.',
            csrfToken: req.csrfToken()
        }
    });
});

app.get('/markdown', function(req, res) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.render('editor', {
        post: {
            title: 'Create New Markdown Post',
            description: 'Create New Markdown Blog Post.'
        }
    });
});

app.post('/data', [
    check('title', 'title length should be 50 to 60 characters Good for SEO')
    .isLength({
        min: 10,
        max: 65
    }),
    check('description', 'description length should be 100 to 140 characters Good for SEO')
    .isLength({
        min: 60,
        max: 155
    }),
    check('postcontent', 'Fill Some Post Content').not().isEmpty().trim().escape(),
    check('tag', 'Enter Atleast one Tag for Post').not().isEmpty().trim().escape(),
], function(req, res) {

    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const blog_title = req.body.title
    const random_id = Math.floor(1000 + Math.random() * 9000)
    const basename = sitedata.url_data + "-" + random_id

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    } else {

        const seo_url = slugify(blog_title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });

        var title = blog_title;
        var description = req.body.description;
        var date = formattedDate;
        var tag = req.body.tag;
        var postcontent = req.body.postcontent;
        let content = [{
            title: title || "Example Post title",
            description: description || "Example Post description",
            date: date,
            tag: tag || "Hello World",
            postcontent: postcontent || "Example Post Content",
            slug: decodeURIComponent(seo_url)
        }];
        let template = fs.readFileSync("./template.md").toString()
        content.forEach(post_data => {
            let output = render(template, post_data)
            const clean_url = basename;
            fs.writeFileSync(`${sitedata.storage_path}/${clean_url}.${sitedata.format}`, output)
            console.log(post_data);
        })
        res.status(200).json({
            sucess: 1,
            message: 'Post Created'
        });
    }
});

app.post('/post', csrfProtection, [
    check('title', 'title length should be 50 to 60 characters Good for SEO')
    .isLength({
        min: 10,
        max: 65
    }),
    check('description', 'description length should be 100 to 140 characters Good for SEO')
    .isLength({
        min: 60,
        max: 155
    }),
    check('postcontent', 'Fill Some Post Content').not().isEmpty().trim().escape(),
    check('tag', 'Enter Atleast one Tag for Post').not().isEmpty().trim().escape(),
], function(req, res) {

    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const blog_title = req.body.title
    const random_id = Math.floor(1000 + Math.random() * 9000)
    const basename = sitedata.url_data + "-" + random_id

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    } else {

        const seo_url = slugify(blog_title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });

        var title = blog_title;
        var description = req.body.description;
        var date = formattedDate;
        var tag = req.body.tag;
        var postcontent = req.body.postcontent;
        let content = [{
            title: title || "Example Post title",
            description: description || "Example Post description",
            date: date,
            tag: tag || "Hello World",
            postcontent: postcontent || "Example Post Content",
            slug: decodeURIComponent(seo_url)
        }];
        let template = fs.readFileSync("./template.md").toString()
        content.forEach(post_data => {
            let output = render(template, post_data)
            const clean_url = basename;
            fs.writeFileSync(`${sitedata.storage_path}/${clean_url}.${sitedata.format}`, output)
            console.log(post_data);
        })
        res.status(200).json({
            sucess: 1,
            message: 'Post Created'
        });
    }
});

app.get('/api', basicAuth({
    users: { 'admin':sitedata.password },
    challenge: true,
    unauthorizedResponse: 'not authorized'
}), [
    check('title', 'title length should be 50 to 60 characters Good for SEO')
    .isLength({
        min: 10,
        max: 65
    }),
    check('description', 'description length should be 100 to 140 characters Good for SEO')
    .isLength({
        min: 60,
        max: 155
    }),
    check('postcontent', 'Fill Some Post Content').not().isEmpty().trim().escape(),
    check('tag', 'Enter Atleast one Tag for Post').not().isEmpty().trim().escape(),
], function(req, res) {

    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const blog_title = req.query.title
    const random_id = Math.floor(1000 + Math.random() * 9000)
    const basename = sitedata.url_data + "-" + random_id

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    } else {

        const seo_url = slugify(blog_title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: false
        });

        var title = blog_title;
        var description = req.query.description;
        var date = formattedDate;
        var tag = req.query.tag;
        var postcontent = req.query.postcontent;
        let content = [{
            title: title || "Example Post title",
            description: description || "Example Post description",
            date: date,
            tag: tag || "Hello World",
            postcontent: postcontent || "Example Post Content",
            slug: decodeURIComponent(seo_url)
        }];
        let template = fs.readFileSync("./template.md").toString()
        content.forEach(post_data => {
            let output = render(template, post_data)
            const clean_url = basename;
            fs.writeFileSync(`${sitedata.storage_path}/${clean_url}.${sitedata.format}`, output)
            console.log(post_data);
        })
        res.status(200).json({
            sucess: 1,
            message: 'Post Created'
        });
    }
});

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Web App Error'
    });
});
app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403).json({
        error: 1,
        message: 'Token Error'
    });
})

module.exports = app;