const express = require('express');
const fs = require("fs");
const {
    render
} = require("mustache");
const sitedata = require("./config.json");
const slugify = require("slugify");

const app = express();
const port = 3005;

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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

app.get('/', function(req, res) {
    res.render('home', {
        post: {
            title: 'Create New Markdown Post',
            description: 'Create New Markdown Blog Post.'
        }
    });
});

app.post('/', function(req, res) {

    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const blog_title = req.body.title
    const random_id = Math.floor(1000 + Math.random() * 9000)
    const basename = sitedata.url_data + "-" + random_id

    if (blog_title == 0 || blog_title == "") {

        res.status(200).json({
            sucess: 0,
            message: 'Error Something is Missing'
        });

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

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Web App Error'
    });
});