module.exports = server => {
  var router = server.loopback.Router();
  router.get("/", (req, res) => {
    res.status(200);
    res.send("Chatten API V1");
  });
  server.use("/api", router);
};
