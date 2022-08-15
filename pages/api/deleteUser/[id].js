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
}).delete(async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.query.id });
    res.status(200).send("user deleted");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default handler;
