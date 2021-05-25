const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');

const app = express();

// Here is the example that how I scrape bird image from Wikipedia for my teammates
app.get('/scraped/:target', (req, res) => {
    axios('https://en.wikipedia.org/wiki/' + req.params["target"])
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const allImgTags = $('img');

            const allUrls = [];

            for (let i = 0; i < allImgTags.length; i++) {
                allUrls.push(allImgTags[i].attribs.src);
            }

            res.status(200).send(allUrls);
        })
        .catch(console.error);
});

// Here is how I will use data from my teammates
app.get('/cats', (req, res) => {
    axios('https://myteammaates-microservice/cats')
        .then(response => {
            const data = response.data;
            res.status(200).send(data);
        })
        .catch(console.error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});