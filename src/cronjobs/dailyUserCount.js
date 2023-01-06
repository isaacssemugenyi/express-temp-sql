const schedule = require('node-schedule');
const logger = require('../utils/logger');

module.exports = {
  loadCronJobs: () =>
    schedule.scheduleJob('*/40 * * * * *', () =>
      logger.error('Cron job loaded')
    ),
};
