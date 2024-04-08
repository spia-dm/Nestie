import { Schema, model, models } from "mongoose";

const house_data = new Schema(
  {
    id: Number,
    house_name: String,
    house_url: String,
    price: String,
    location: String,
    size: String,
    likes: Number,
    Comments: Array,
    uploaded_by: String,
    description: String
  }    
);

export default models.House || model("House", house_data);