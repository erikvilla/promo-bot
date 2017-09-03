import blacklistCommand from './blacklist';
import unblacklistCommand from './unblacklist';
import startCommand from './start';

const commandArray = [
  blacklistCommand,
  unblacklistCommand,
  startCommand,
];

export {
  blacklistCommand,
  unblacklistCommand,
  startCommand,
};

export default commandArray;
