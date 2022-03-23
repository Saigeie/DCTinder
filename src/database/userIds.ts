import Mongoose from "mongoose";
import { config } from "dotenv";
config()

export interface UserIds {
    key: String;
    userIds: Array<string>;
}

const schema = new Mongoose.Schema({
  key: { type: String, default: `${process.env.KEY}` },
  userIds: { type: Array, default: [] },
});

export default Mongoose.model("userIds", schema);
