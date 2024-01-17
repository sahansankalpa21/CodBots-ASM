const http = require("http");
const app = require("./index");
const cors = require("cors");

const server = http.createServer(app);
app.use(cors);
// app.use(cors({
//   origin: "https://64d1f6651411fb3fe63988e6--wondrous-tulumba-81cc1e.netlify.app/",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
