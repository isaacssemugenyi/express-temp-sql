const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const logger = require('./src/utils/logger');
const { serve, setup } = require('swagger-ui-express');
// const { apiDocumentation } = require('./src/docs/apidoc');
const { loadCronJobs } = require('./src/cronJobs/dailyUserCount');

dotenv.config();

const { createAllTables } = require('./src/database/tables');
const app = express();

// Limit API calls
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

app.get('/v1/health', (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

require('./src/app')(app);
// app.use('/documentation', serve, setup(apiDocumentation));

const PORT = process.env.PORT || 6060;

/**
 * @description
 *  - endpoint => http://localhost:8000/*
 *  - end point that handles unknown routes
 * @returns {object}
 * @example {message: 'Resource not found'}
 */
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.listen(PORT, () => {
  createAllTables()
    .then(() => logger.info(`Server running on port : ${PORT}`))
    .then(() => loadCronJobs())
    .catch((error) =>
      logger.info(`Failed to start app with error: ${error.message}`)
    );
});

module.exports = app;
