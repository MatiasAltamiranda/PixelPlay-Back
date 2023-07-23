const { Schema, model} = require ("mongoose");

const reviewSchema = new Schema(
    {
      title: {
        type: String,
        required: [true, "El título es obligatorio"],
        minlength: 2,
        maxlength: 50,
        trim: true,
      },
      content: {
        type: String,
        required: [true, "El contenido es obligatorio"],
        minlength: 10,
        maxlength: 450,
        trim: true,
      },
      rating: {
        type: Number,
        required: [true, "La calificación es obligatoria"],
        min: 1,
        max: 5,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      game: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );; 

const Review = model ("Review", reviewSchema);

module.exports = {
  reviewSchema,
  Review
};