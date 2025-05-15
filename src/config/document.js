export const documentApi = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Books API Documentation</title>
  <style>
    body {
      background-color: #f9fafb;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #1f2937;
      padding: 20px;
      line-height: 1.6;
    }
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    header h1 {
      color: #059669;
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    header code {
      background-color: #e0f2f1;
      padding: 4px 8px;
      border-radius: 5px;
      font-size: 0.95em;
    }
    section {
      margin-bottom: 40px;
    }
    h2 {
      color: #047857;
      border-bottom: 2px solid #a7f3d0;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    h3 {
      color: #065f46;
      font-size: 1.2em;
      margin-top: 20px;
    }
    a {
      color: #10b981;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .endpoint {
      margin-bottom: 20px;
    }
    .note {
      color: #ef4444;
      font-weight: bold;
    }
    pre {
      background-color: #ecfdf5;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.95em;
    }
    .headers {
      background-color: #fff7ed;
      border: 1px solid #fdba74;
      color: #78350f;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

  <header>
    <h1>📚 Books API Documentation</h1>
    <p>Base URL: <code>https://bookshelf-api-sigma.vercel.app/api</code></p>
  </header>

  <section>
    <h2>Books</h2>

    <div class="endpoint">
      <h3>GET <a href="https://bookshelf-api-sigma.vercel.app/api/books/get" target="_blank">/books/get</a></h3>
      <p>Returns a list of all books. <span class="note">Authentication required</span></p>
      <div class="headers">
        Header: <br>
        Authorization: Bearer <code>YOUR_ACCESS_TOKEN</code>
      </div>
      <pre>[
  {
    "title": "JavaScript Deep Dive",
    "author": "Kyle Simpson",
    "image": "https://example.com/images/js-deep-dive.jpg",
    "published": 2020,
    "pages": 350,
    "status": "available",
    "userId": "64a9fba5c7f6e91b12345678"
  },
  {
    "title": "Node.js in Action",
    "author": "Mike Cantelon",
    "image": "https://example.com/images/nodejs-in-action.jpg",
    "published": 2021,
    "pages": 420,
    "status": "sold",
    "userId": "64a9fba5c7f6e91b12345678"
  }
]</pre>
    </div>

    <div class="endpoint">
      <h3>GET <a href="https://bookshelf-api-sigma.vercel.app/api/books/get-one/:id" target="_blank">/books/get-one/:id</a></h3>
      <p>Returns information about a specific book by ID. <span class="note">Authentication required</span></p>
      <div class="headers">
        Header: <br>
        Authorization: Bearer <code>YOUR_ACCESS_TOKEN</code>
      </div>
      <pre>{
  "title": "JavaScript Deep Dive",
  "author": "Kyle Simpson",
  "image": "https://example.com/images/js-deep-dive.jpg",
  "published": 2020,
  "pages": 350,
  "status": "available",
  "userId": "64a9fba5c7f6e91b12345678"
}</pre>
    </div>

  </section>

</body>
</html>


`