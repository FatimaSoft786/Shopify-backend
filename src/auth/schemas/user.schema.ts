import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  country: string;

  @Prop()
  product: string;

  @Prop()
  phone_number: string;

  @Prop({ default: false })
  account_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
