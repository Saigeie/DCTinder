import Mongoose from "mongoose";

export interface Users {
  userId: string;
  BasicInformation: object;
  CustomInformation: object;
  profileViews: Number;
  matches: Number;
  blockedUserIds: Array<string>;
}

const schema = new Mongoose.Schema({
  userId: { type: String },
  BasicInformation: { type: Object, default: {} },
  CustomInformation: { type: Object, default: {} },
  
  // Stats
  profileViews: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  blockedUserIds: { type: Array, default: []}
});

export default Mongoose.model("Users", schema);
