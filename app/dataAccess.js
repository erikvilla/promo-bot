import datastore from './datastore';

const chatMap = {};

const loadApplicationData = () => {
  const query = datastore.createQuery('chat');
  datastore.runQuery(query).then((response) => {
    const results = response[0];
    results.forEach((item) => {
      chatMap[item.telegram_id] = { blacklist: item.blacklist };
    });
  });
};

const save = (collection, data, id) => {
  let key = id ? [collection, id] : collection;
  key = datastore.key(key);
  return datastore.insert({
    key,
    data,
  }).then(() => loadApplicationData());
};

const saveChatConfig = (chatId) => {
  save('chat', { blacklist: [], telegram_id: chatId }, chatId);
};

const update = (collection, data, id) => {
  let key = [collection, id];
  key = datastore.key(key);
  return datastore.upsert({
    key,
    data,
  });
};

const updateBlacklist = (chatId, blacklist) => {
  update('chat',
    { blacklist,
      telegram_id: chatId,
    }, chatId);
  chatMap[chatId].blacklist = blacklist;
};

const getBlacklist = chatId => (chatMap[chatId] ? chatMap[chatId].blacklist : []);

const getChatIds = () => (Object.keys(chatMap));

export {
  getChatIds,
  loadApplicationData,
  saveChatConfig,
  updateBlacklist,
  getBlacklist,
};
