# Twitter Link Expander

A lightweight Node.js API for expanding Twitter/X shortened URLs (t.co links) to their original destination URLs.

![Twitter Link Expander Demo](https://via.placeholder.com/800x400?text=Twitter+Link+Expander+Demo)

## Features

- Expands Twitter/X shortened URLs (t.co links) to their full destination URLs
- Multiple fallback methods to handle Twitter's redirection quirks
- Simple REST API with both POST and GET endpoints
- HTML test client included
- Detailed logging for troubleshooting

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/twitter-link-expander.git
cd twitter-link-expander

# Install dependencies
npm install
```

## Usage

### Start the Server

```bash
node twitter-link-expander.js
```

The server will start on port 3000 by default (configurable via PORT environment variable).

### API Endpoints

#### POST /api/expand

```bash
# Example using curl
curl -X POST http://localhost:3000/api/expand \
  -H "Content-Type: application/json" \
  -d '{"url": "https://t.co/uQwbMzcf37"}'
```

Response:
```json
{
  "original": "https://t.co/uQwbMzcf37",
  "expanded": "https://www.pinkvilla.com/entertainment/news/neil-nitin-mukesh-admits-he-was-called-angrez-ka-baccha-and-firangi-heres-how-actor-turned-it-all-into-positives-1384940",
  "success": true
}
```

#### GET /api/expand-url

Direct browser-friendly endpoint:
```
http://localhost:3000/api/expand-url?url=https://t.co/uQwbMzcf37
```

Returns the same JSON response.

#### GET /api/health

Check if the API is running:
```
http://localhost:3000/api/health
```

### Using in Frontend Code

#### JavaScript (Fetch API)

```javascript
fetch('http://localhost:3000/api/expand', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://t.co/uQwbMzcf37' }),
})
.then(response => response.json())
.then(data => console.log(data));
```

#### Node.js (Axios)

```javascript
const axios = require('axios');

axios.post('http://localhost:3000/api/expand', {
  url: 'https://t.co/uQwbMzcf37'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
```

## CDN Deployment Options

### Option 1: Deploy as a Microservice

You can deploy this API to various platforms and use it as a microservice:

- **Vercel**: Deploy as a serverless function
- **Netlify**: Deploy as a function
- **Heroku**: Deploy as a web app
- **AWS Lambda**: Deploy as a serverless function
- **Google Cloud Functions**: Deploy as a serverless function

### Option 2: Use with a CDN

To serve this API via a CDN:

1. Deploy the API to a hosting service like Vercel, Netlify, or any platform mentioned above
2. Configure the CDN (like Cloudflare, Fastly, or AWS CloudFront) to point to your deployed API
3. Set appropriate cache headers:

```javascript
// Add these headers to your API responses
res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
res.setHeader('Vary', 'Origin');
```

### Option 3: Use the Client as a CDN Resource

You can also host just the HTML client file on a CDN:

1. Upload the `index.html` file to a CDN or static hosting service
2. Configure the HTML file to point to your API endpoint
3. Users can access the client via the CDN URL

Example CDN URLs:
```
https://cdn.jsdelivr.net/gh/yourusername/twitter-link-expander@main/index.html
https://unpkg.com/twitter-link-expander/index.html (if published as npm package)
```

## File Structure

```
twitter-link-expander/
├── twitter-link-expander.js  # Main server file
├── index.html               # HTML test client
├── package.json             # Project dependencies
└── README.md                # This documentation
```

## Environment Variables

- `PORT`: Port number (default: 3000)
- `NODE_ENV`: Environment ('development' or 'production')

## Dependencies

- express: Web server framework
- axios: HTTP client for making requests
- cors: Cross-Origin Resource Sharing middleware

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
