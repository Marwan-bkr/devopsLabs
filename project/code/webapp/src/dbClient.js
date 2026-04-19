var redis = require("redis");
const configure = require('./configure');

const config = configure();

var db = redis.createClient({
  url: process.env.REDIS_URL || `redis://${config.redis.host}:${config.redis.port}`,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.log('Redis refused connection. Retrying...');
    }
    if (options.attempt > 10) {
      return new Error("Retry attempts exhausted");
    }
    return Math.min(options.attempt * 100, 2000); 
  }
});

db.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

db.on('connect', () => {
  console.log('Successfully connected to Redis');
});

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db;