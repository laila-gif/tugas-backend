// ============================================================
// middleware/logger.js  —  Custom request logger
// ============================================================

const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration  = Date.now() - start;
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    const status    = res.statusCode;

    let color = '\x1b[32m'; // hijau 2xx
    if (status >= 400 && status < 500) color = '\x1b[33m'; // kuning 4xx
    if (status >= 500)                 color = '\x1b[31m'; // merah  5xx

    const reset = '\x1b[0m';
    const dim   = '\x1b[2m';
    const cyan  = '\x1b[36m';

    console.log(
      `${dim}[${timestamp}]${reset} ` +
      `${cyan}${req.method.padEnd(7)}${reset} ` +
      `${req.originalUrl.padEnd(35)} ` +
      `${color}${status}${reset} ` +
      `${dim}${duration}ms${reset}`
    );
  });

  next();
};

module.exports = logger;
