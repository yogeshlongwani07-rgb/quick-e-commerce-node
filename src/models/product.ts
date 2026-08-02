import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
      enum: [
        "Fruits",
        "Vegetables",
        "Dairy",
        "Bakery",
        "Snacks",
        "Beverages",
        "Personal Care",
        "Household",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "L", "ml", "pcs", "pack"],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
