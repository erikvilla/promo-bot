import { getBlacklist } from '../dataAccess';

const composeMessage = article => (`${article.title} | ${article.link}`);
const includes = (base, search) => (base.toUpperCase().includes(search.toUpperCase()));

const isBlacklisted = (article, chatId) => {
  const blacklistArray = getBlacklist(chatId);
  for (let i = 0; i < blacklistArray.length; i += 1) {
    const containsBlacklistWord = includes(article.title, blacklistArray[i]);
    const blacklistWordInContent = includes(article.content, blacklistArray[i]);
    if (containsBlacklistWord || blacklistWordInContent) {
      return true;
    }
  }
  return false;
};

const sendIntervalMessages = (telegramInstance, id, articles, interval = 1000) => {
  let count = 0;
  // interval to send messages, it is not possible to send an array
  const messageInterval = setInterval(() => {
    if (count <= articles.length - 1) {
      const article = articles[count];
      if (!isBlacklisted(article, id)) {
        telegramInstance.sendMessage(id, composeMessage(articles[count]));
      }
      count += 1;
    } else {
      clearInterval(messageInterval);
    }
  }, interval);
};

export {
  composeMessage,
  includes,
  isBlacklisted,
  sendIntervalMessages,
};
