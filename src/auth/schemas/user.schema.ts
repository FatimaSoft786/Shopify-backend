import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  country: string;

  @Prop()
  product: string;

  @Prop()
  phone_number: number;

  @Prop()
  account_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
