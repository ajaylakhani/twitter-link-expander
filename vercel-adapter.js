// vercel-adapter.js
// Import your original server code
const originalApp = require('./twitter-link-expander.js');

// Export the Express app for Vercel
module.exports = originalApp;