const userRouter = require("./user.js");
const authRouter = require("./auth.js");
const postRouter = require("./post.js");
const commentRouter = require("./comment.js");
const courseRouter = require("./course.js");
const categoryRouter = require("./category.js");
const stockRouter = require("./stock.js");
const detailStockRouter = require("./detailStock.js");
const watchListRouter = require("./watchList.js");
const stockTodayRouter = require("./stockToday.js");

function route(app) {
  app.use("/users", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  app.use("/courses", courseRouter);
  app.use("/categories", categoryRouter);
  app.use("/stocks", stockRouter);
  app.use("/detail-stocks", detailStockRouter);
  app.use("/watch-list", watchListRouter);
  app.use("/stocks-today", stockTodayRouter);
}

module.exports = route;
