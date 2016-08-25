const accounts = require('./resources/accounts');
const streams = require('./resources/streams');
const messages = require('./resources/messages');
const queues = require('./resources/queues');

function resources(config) {
  return {
    config: config,
    accounts: accounts(config),
    streams: streams(config),
    messages: messages(config),
    queues: queues(config)
  };
}

module.exports = function(config) {
  config.apiURL = config.realm + '/api/v1';
  if (!config.apiKey) {
    return accounts(config).retrieve().then(res => {
      config.apiKey = res.api_key;
      return resources(config);
    });
  } else {
    return resources(config);
  }
};