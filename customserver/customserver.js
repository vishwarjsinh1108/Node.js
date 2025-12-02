const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5005;

const server = http.createServer((req, res) => {
  console.log("URL is:", req.url);

  let filePath = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "index.html");
  } 
  else if (req.url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } 
  else if (req.url === "/style.css") {
    filePath = path.join(__dirname, "style.css");
    res.writeHead(200, { "Content-Type": "text/css" });
    const cssStream = fs.createReadStream(filePath);
    cssStream.pipe(res);
    return;
  } 
  else {
    res.end("<h1>Page Not Found</h1>");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.end("<h1>Server Error</h1>");
    } else {
      res.end(data);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
