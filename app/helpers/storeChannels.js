import config from 'config';
import Telegraf from 'telegraf';

const storeArray = ['amazon'];

const storeConfig = storeArray.map(store => ({
  store,
  token: process.env[store] || config.get(store),
}));

const storeInstances = storeConfig.map(storeObject => (
  {
    store: storeObject.store,
    instance: new Telegraf(storeObject.token),
    token: storeObject.token,
  }
));

const startPolling = () => {
  storeInstances.forEach((storeInstance) => {
    storeInstance.instance.telegram.setWebhook();
    storeInstance.instance.startPolling();
  });
};

export {
  storeArray,
  storeInstances,
  startPolling,
};
