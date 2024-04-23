import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginInDto: LoginDto) {
    try {
      console.log(loginInDto);
      const userByUsername = await this.userService.findOneTest(
        loginInDto.username,
      );
      return userByUsername;
    } catch (error) {
      throw error;
    }
  }
  // async testFunc(username: string, password: string) {
  //   try {
  //     const userByUsername = await this.userRepository.findOne(

  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
