const feed = require('feed-read');
const _ = require('lodash');

// TODO: take this from config
const URL = 'https://www.promodescuentos.com/rss/todas';
const UPDATE_TIME = 60000;

let lastArticleLinks = [];

const halfArray = (array) => {
  let middle = array.length - (array.length / 2);
  middle = Math.floor(middle);
  return array.slice(middle, array.length - 1);
}

const feedReader = {
  read: (onUpdate) => {
    setInterval(() => {
      feed(URL, (err, response) => {
        if (err) console.log(err);
        if (_.isEmpty(response)) return null;

        const articles = _.reverse(response);
        const articleLinks = articles.map(article => article.link);
        const newArticleLinks = _.difference(articleLinks, lastArticleLinks);
        lastArticleLinks = _.concat(lastArticleLinks, newArticleLinks);

        // keep only last 100 articles to compare
        if (lastArticleLinks.length >= 100) {
          lastArticleLinks = halfArray(lastArticleLinks);
        }
        // filter articles to return
        const newArticles = articles.filter(article => (
          newArticleLinks.indexOf(article.link) !== -1
        ));

        console.log('new article links:', newArticleLinks);
        onUpdate(newArticles);
      });
    }, UPDATE_TIME);
  },
};

module.exports = feedReader;
