var rssToJson = require('rss-to-json');
var idGen = require('uuid/v4');
var fs = require('fs');

function generateJson(rss) {
    var jsonFeed = [];
    rss = rss.items;

    for (i = 0; i < rss.length; i++) {
        var feedObj = {
            "uid": idGen(),
            "updateDate": Date.now().toString(),
            "titleText": rss[i].title,
            "mainText": rss[i].description,
            "redirectionUrl": rss[i].link
        }
        jsonFeed.push(feedObj); 
    }
    return jsonFeed;
}
rssToJson.load('https://zapier.com/engine/rss/2782546/innovationlab/', function(err, rss){
    
    var feedData = generateJson(rss);
    console.log(feedData);
    fs.writeFile('myjsonfile.json', JSON.stringify(feedData), 'utf8');
});
