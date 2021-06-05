const express = require('express');
const path = require('path');
const app = express();
const model = require('../database/index.js');
const s3 = require('../s3');
const multer = require('multer');
const bodyParser = require('body-parser');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());

app.get('/cats', (req, res) => {
  model.CatModel.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/catSearch', (req, res) => {
  model.CatModel.find({
    $or: [
      { breed: { $regex: req.query.searchInfo, $options: 'i' } },
      { name: { $regex: req.query.searchInfo, $options: 'i' } },
      { age: { $regex: req.query.searchInfo, $options: 'i' } },
      { location: { $regex: req.query.searchInfo, $options: 'i' } },
      { status: { $regex: req.query.searchInfo, $options: 'i' } },
      { information: { $regex: req.query.searchInfo, $options: 'i' } },
    ],
  })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/catInfo', (req, res) => {
  model.CatModel.find({});
});

app.post('/upload', upload.single('file'), (req, res) => {
  let file = req.file;
  console.log('file info:', file);
  console.log('body info:', req.body);

  let s3FileURL = process.env.AWS_Upload_File_URL_LINK;
  let params = {
    Bucket: 'catcommunitybucket',
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  s3.upload(params, (err, data) => {
    console.log(data);
    if (err) {
      res.status(500).json({ err: true, Message: err });
    } else {
      res.send({ data });
      let newFileUploaded = {
        imageURL: data.Location,
        breed: req.body.breed,
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        status: req.body.status,
        information: req.body.information,
      };
      let document = new model.CatModel(newFileUploaded);
      document.save((error, newFile) => {
        if (err) {
          throw err;
        }
      });
    }
  });
});

// Here is the example that how I scrape bird image from Wikipedia for my teammate
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
app.get('/homeCat', (req, res) => {
  axios('http://flip2.engr.oregonstate.edu:7749/?search_name=cats')
      .then(response => {
          const data = response.data;
          const arr = [];
          for (const key of Object.keys(data)) {
              arr.push(data[key]);
          }
          res.status(200).send(arr);
      })
      .catch(console.error);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
