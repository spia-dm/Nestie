import { Schema, model, models } from "mongoose";

const user_data = new Schema(
  {
    name:String,
    email:String,
    image:String,
    secret:String,
    notifications:Array
  }
);

export default models.User || model("User", user_data);