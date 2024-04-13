import { Schema, model, models } from "mongoose";

const house_data = new Schema(
  {
    id: String,
    house_name: String,
    house_url: String,
    price: String,
    location: String,
    size: String,
    likes: Array,
    comments: Array,
    uploaded_by: String,
    description: String,
    email:String
  }    
);

export default models.House || model("House", house_data);