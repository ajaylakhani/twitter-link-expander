{
  "version": 2,
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "routes": [
    {
      "src": "/",
      "dest": "/index.js"
    },
    {
      "src": "/api/(.*)",
      "dest": "/api/$1.js"
    }
  ]
}
