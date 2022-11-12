const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "some secret title",
      description: "some secret description",
    },
  });
});

module.exports = router;
