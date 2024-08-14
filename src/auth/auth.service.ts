import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.userModel.create(signUpDto);
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { phone_number } = loginDto;
    const user = await this.userModel.findOne({ phone_number });
    if (!user) {
      throw new UnauthorizedException('Invalid phone number');
    }
    if (user.account_verified === false) {
      throw new UnauthorizedException('Sorry first verify your phone number.');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async updateById(id: string, signUpDto: SignUpDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, signUpDto, {
      new: true,
      runValidators: true,
    });
  }
}
