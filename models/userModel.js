const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const {reviewSchema} = require("./review");
const {gameSchema} = require ("./gameModel")
const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  lastname: {
    type: String,
    require: [true, "El apellido es obligatorio"],
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  numberPhone: {
    type: Number,
    validate: {
      validator: function (value) {
        return Number.isInteger(value) && value >= 0;
      },
      message: "El número de teléfono debe ser un número entero positivo",
    },
  },
  email: {
    type: String,
    require: [true, "El Email es obligatorio"],
    minlength: 4,
    maxlength: 30,
    unique: true,
    validate: [validator.isEmail, "Ingrese un mail valido"],
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin", "super"],
      message: "El valor que ingreso no es correcto",
    },
    default: "user",
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
    minlength: 8,
    maxlength: 30,
    select: false,
  },
  confirmPassword: {
    type: String,
    require: [true, "La confirmar contraseña es obligatoria"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Las contraseñas no coniciden",
    },
  },
  passwordChangeAt: {
    type: Date,
  },
  cart: [
    {
      game: { type: gameSchema },
    }],
  passwordResetToken: String,
  passwordResetExpires: Date,

  reviews: [reviewSchema]},
  
  {
    timestamps : true
}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async function (reqPassword, DBPassword) {
  return await bcrypt.compare(reqPassword, DBPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 60 * 5 * 1000;
  return resetToken;
};

userSchema.methods.passwordChangeAfter = function (JWTTime) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000);
    return JWTTime < changedTimestamp;
  }
  return false;
};

const User = model("UsersDB", userSchema);

module.exports = User;
