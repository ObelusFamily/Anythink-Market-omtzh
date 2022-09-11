const mongoose = require("mongoose");
const crypto = require("crypto");
require("../models/User");
require("../models/Item");
require("../models/Comment");

const Item = mongoose.model("Item");
const User = mongoose.model("User");
const Comment = mongoose.model("Comment");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongo in seed script"))
  .catch((err) => console.error(err));

mongoose.set("debug", true);

async function seedMockUser() {
  // generate random uuid and password
  const uuid = crypto.randomUUID().split("-")[0];
  const password = crypto.randomUUID().split("-")[1];

  const user = new User();
  user.username = `mockuser${uuid}`;
  user.email = `testuser${uuid}@email.com`;
  user.setPassword(password);

  try {
    // save user to DB
    await user.save();
    return user._id;
  } catch (err) {
    console.error("An error occured while seeding user", err);
  }
}

async function seedMockItem(userId) {
  const uuid = crypto.randomUUID().split("-")[0];
  const item = new Item();

  item.slug = `mock${uuid}`;
  item.title = `mock${uuid}`;
  item.description = `mock${uuid} description`;
  item.tagList = ["mock", "seeditem"];
  item.seller = userId;

  try {
    // save item to DB
    await item.save();
    return item._id;
  } catch (err) {
    console.error("An error occured while seeding item", err);
  }
}

async function seedComment(userId, itemId) {
  const comment = new Comment();

  comment.body = "Wow this item is so special!";
  comment.seller = userId;
  comment.item = itemId;

  try {
    // save comment to DB
    await comment.save();
    return comment._id;
  } catch (err) {
    console.error("An error occured while seeding comment", err);
  }
}

async function populateMockItems() {
  // clear prexisting items from DB before seeding
  await User.deleteMany({});
  await Item.deleteMany({});

  // seed 100 items
  for (let i = 0; i < 100; i++) {
    // seed User
    const userId = await seedMockUser();
    // seed Item
    const itemId = await seedMockItem(userId);
    // seed Comment
    await seedComment(userId, itemId);
  }
}

(async () => {
  await populateMockItems();
  process.exit();
})();
