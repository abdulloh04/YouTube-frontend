const express = require("express");
const path = require("path")
const app = express();
const os = require("os")
console.clear();

app.use(express.static(path.join(process.cwd(), 'client')));

process.PORT = process.env.PORT || 7000
process.IPV4 = os.networkInterfaces()['wlp0s20f3'][0].address
process.HOST = 'http://' + process.IPV4 + ':' + process.PORT



app.use((req, res, next) => {
  res.render = function (fileName) {
    res.sendFile(path.join(__dirname, 'client', fileName + '.html'))
  }
  next()
})



app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});


app.listen(process.PORT, () => console.log("Public: ", process.HOST));
