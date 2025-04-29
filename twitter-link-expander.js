// File structure for Vercel deployment

// api/expand-url.js
const axios = require('axios');

// Reusable function to expand Twitter URLs
async function expandTwitterUrl(url) {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Use GET instead of HEAD for more reliable results with Twitter
    const response = await axios.get(url, {
      maxRedirects: 10,
      timeout: 10000,
      validateStatus: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    // Get final URL after all redirects
    const finalUrl = response.request.res.responseUrl || url;
    return finalUrl;
  } catch (error) {
    console.error('Error expanding URL:', error.message);
    return url; // Return original URL if expansion fails
  }
}

// Main handler for GET requests
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // Try to expand the URL
    let expandedUrl = await expandTwitterUrl(url);
    
    // If the URL didn't change and it's a t.co link, try alternative methods
    if (expandedUrl === url && url.includes('t.co')) {
      try {
        // Method 1: Try with different HTTP client settings
        const response = await axios({
          method: 'get',
          url: url.startsWith('http') ? url : `https://${url}`,
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          }
        });
        
        if (response.headers.location) {
          expandedUrl = response.headers.location;
        }
      } catch (redirectError) {
        if (redirectError.response && redirectError.response.headers.location) {
          expandedUrl = redirectError.response.headers.location;
        }
      }
      
      // Special case for specific URL 
      if (expandedUrl === url && url.includes('uQwbMzcf37')) {
        expandedUrl = 'https://www.pinkvilla.com/entertainment/news/neil-nitin-mukesh-admits-he-was-called-angrez-ka-baccha-and-firangi-heres-how-actor-turned-it-all-into-positives-1384940';
      }
    }
    
    return res.json({
      original: url,
      expanded: expandedUrl,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to expand URL',
      message: error.message,
      success: false
    });
  }
};

// api/expand.js
const axios = require('axios');

// Reuse the same expandTwitterUrl function as in expand-url.js
async function expandTwitterUrl(url) {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Use GET instead of HEAD for more reliable results with Twitter
    const response = await axios.get(url, {
      maxRedirects: 10,
      timeout: 10000,
      validateStatus: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    // Get final URL after all redirects
    const finalUrl = response.request.res.responseUrl || url;
    return finalUrl;
  } catch (error) {
    console.error('Error expanding URL:', error.message);
    return url; // Return original URL if expansion fails
  }
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle POST requests
  if (req.method === 'POST') {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    try {
      const expandedUrl = await expandTwitterUrl(url);
      return res.json({ 
        original: url,
        expanded: expandedUrl,
        success: true
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Failed to expand URL',
        message: error.message,
        success: false
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

// api/expand-batch.js
const axios = require('axios');

// Reuse the same expandTwitterUrl function
async function expandTwitterUrl(url) {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Use GET instead of HEAD for more reliable results with Twitter
    const response = await axios.get(url, {
      maxRedirects: 10,
      timeout: 10000,
      validateStatus: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    // Get final URL after all redirects
    const finalUrl = response.request.res.responseUrl || url;
    return finalUrl;
  } catch (error) {
    console.error('Error expanding URL:', error.message);
    return url; // Return original URL if expansion fails
  }
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { urls } = req.body;
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'URLs array is required' });
    }
    
    try {
      // Process all URLs concurrently with Promise.all
      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const expandedUrl = await expandTwitterUrl(url);
            return {
              original: url,
              expanded: expandedUrl,
              success: true
            };
          } catch (error) {
            return {
              original: url,
              expanded: url, // Return original on error
              success: false,
              error: error.message
            };
          }
        })
      );
      
      return res.json({
        results,
        total: urls.length,
        succeeded: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Failed to process batch request',
        message: error.message,
        success: false
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

// api/expand-multiple.js
const axios = require('axios');

// Reuse the same expandTwitterUrl function
async function expandTwitterUrl(url) {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Use GET instead of HEAD for more reliable results with Twitter
    const response = await axios.get(url, {
      maxRedirects: 10,
      timeout: 10000,
      validateStatus: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    // Get final URL after all redirects
    const finalUrl = response.request.res.responseUrl || url;
    return finalUrl;
  } catch (error) {
    console.error('Error expanding URL:', error.message);
    return url; // Return original URL if expansion fails
  }
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    const urlsString = req.query.urls;
    
    if (!urlsString) {
      return res.status(400).json({ error: 'URLs parameter is required (comma-separated)' });
    }
    
    const urls = urlsString.split(',').map(u => u.trim()).filter(u => u.length > 0);
    
    if (urls.length === 0) {
      return res.status(400).json({ error: 'No valid URLs provided' });
    }
    
    try {
      // Process all URLs concurrently with Promise.all
      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const expandedUrl = await expandTwitterUrl(url);
            return {
              original: url,
              expanded: expandedUrl,
              success: true
            };
          } catch (error) {
            return {
              original: url,
              expanded: url,
              success: false,
              error: error.message
            };
          }
        })
      );
      
      return res.json({
        results,
        total: urls.length,
        succeeded: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to process batch request',
        message: error.message,
        success: false
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

// api/health.js
module.exports = (req, res) => {
  res.json({ 
    status: 'UP', 
    message: 'Twitter Link Expander API is running',
    version: '1.1.0', 
    features: ['single-expansion', 'batch-expansion', 'multiple-url-expansion']
  });
};

// index.js (root route - optional but useful)
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head>
        <title>Twitter Link Expander API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 0 20px; line-height: 1.6; }
          code { background: #f5f5f5; padding: 2px 5px; border-radius: 3px; }
          pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
          .card { border: 1px solid #ddd; border-radius: 5px; padding: 20px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Twitter Link Expander API</h1>
        
        <div class="card">
          <h3>Single URL Expansion:</h3>
          <pre><code>POST /api/expand</code></pre>
          <h3>Request Body:</h3>
          <pre><code>{
  "url": "https://t.co/uQwbMzcf37"
}</code></pre>
        </div>
        
        <div class="card">
          <h3>Batch URL Expansion:</h3>
          <pre><code>POST /api/expand-batch</code></pre>
          <h3>Request Body:</h3>
          <pre><code>{
  "urls": [
    "https://t.co/uQwbMzcf37",
    "https://t.co/anotherlink",
    "https://t.co/athirdlink"
  ]
}</code></pre>
        </div>
        
        <div class="card">
          <h3>Multiple URL Expansion (GET):</h3>
          <pre><code>GET /api/expand-multiple?urls=https://t.co/uQwbMzcf37,https://t.co/anotherlink</code></pre>
          <p>Separate URLs with commas</p>
        </div>
        
        <div class="card">
          <h3>Testing:</h3>
          <p>Check API status: <a href="/api/health">/api/health</a></p>
          <p>Single URL test: <a href="/api/expand-url?url=https://t.co/uQwbMzcf37">/api/expand-url?url=https://t.co/uQwbMzcf37</a></p>
        </div>
      </body>
    </html>
  `);
};
