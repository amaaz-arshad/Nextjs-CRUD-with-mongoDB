import nc from "next-connect";
import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";

connectDB();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).put(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.id });
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    await user.save();
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default handler;
