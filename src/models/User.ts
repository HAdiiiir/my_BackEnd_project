import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, requied: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
});

export const User = model<IUser>('User', userSchema);
