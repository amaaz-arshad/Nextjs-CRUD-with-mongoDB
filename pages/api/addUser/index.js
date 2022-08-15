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
}).post(async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      phone,
    });
    console.log("User created successfully: ", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default handler;
