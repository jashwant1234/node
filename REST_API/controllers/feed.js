exports.getPosts = (req, res, next) => {
  res
    .status(200)
    .json({
      post: [
        {
          titel: "my name is",
          content: "This is the first post",
          imageUrl: "images/1.jpeg",
        }
      ]
    });
};

exports.createPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "creted sucsfuly",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
