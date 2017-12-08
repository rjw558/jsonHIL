var rssToJson = require('rss-to-json');
var idGen = require('uuid/v4');
var dateFormat = require('dateformat');
var fs = require('fs');

function generateJson(rss) {
    var jsonFeed = [];
    rss = rss.items;

    for (var i = 0; i < rss.length; i++) {
        var now = new Date();
        var feedObj = {
            "uid": idGen(),
            "updateDate": dateFormat(now, "isoDateTime"),
            "titleText": rss[i].title,
            "mainText": rss[i].description,
        }
        jsonFeed.push(feedObj); 
    }
    return jsonFeed;
}
rssToJson.load('https://zapier.com/engine/rss/2782546/HILFU/', function(err, rss){
    if (err) {
        console.log('There was an error loading the rss feed:' + err);
    } else {
        var feedData = JSON.stringify(generateJson(rss));
        fs.writeFile('flashupdateHIL.json', feedData, 'utf8', function(error) {
            if (error) {
                console.log('There was an error:' + error);
            }
        });
    }
});
