const request = require('request');
const cheerio = require('cheerio');
import headerData from './private.js'

for (let i = 2; i < 62; i++) {
  request(`https://wanelo.co/stores/shopdevi/followers/${i}`, function (err, response, html) {
   if (!err) {
      let $ = cheerio.load(html);
      let aTags = $(".preview-strip-description-text .pull-left a");
      const names = [];
      for (let key in aTags) {
        if (aTags[key].attribs) {
          if (aTags[key].attribs.title) {
            names.push(aTags[key].attribs.title)
          }
        }
      }
     createRequests(names);
   }
 });

}

function createRequests(arr) {
  arr.forEach((item) => {
    follow(item);
  })
}

function follow(name){
const headers = headerData;

  const options = {
      url: `https://wanelo.co/${name}/follow`,
      method: 'POST',
      headers: headers
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  }

  return request(options, callback);
}



