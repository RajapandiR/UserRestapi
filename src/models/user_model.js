import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : { type: String},
    age : { type: Number},
    image: { type: String},
}, { timestamps: true})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });
const user = mongoose.model('user', userSchema);

export default user;