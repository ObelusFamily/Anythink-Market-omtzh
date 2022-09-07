const mongoose = require("mongoose");
const crypto = require("crypto");
require("../models/User");
require("../models/Item");

const Item = mongoose.model("Item");
const User = mongoose.model("User");

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
  item.tagList = ["seed", "test"];
  item.seller = userId;

  try {
    // save item to DB
    await item.save();
    return item._id;
  } catch (err) {
    console.error("An error occured while seeding item", err);
  }
}

async function populateMockItems() {
  await User.deleteMany({});
  await Item.deleteMany({});

  // seed user
  const userId = await seedMockUser();

  // seed 10 items
  for (let i = 0; i < 10; i++) {
    await seedMockItem(userId);
  }
}

(async () => {
  await populateMockItems();
  process.exit();
})();
