import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(loginInDto: LoginDto) {
    try {
      console.log(loginInDto);

      // const userByEmail = await this.userService.findByEmail(loginInDto.email);
      const userByEmail = await this.userRepository.findOne({
        where: { email: loginInDto.email}
      })

      const comparePassword = await bcrypt.compareSync(loginInDto.password, userByEmail.password);
      console.log(comparePassword);
      if (comparePassword == false) {
        throw new HttpException('user password incorrect', HttpStatus.UNAUTHORIZED);
      }
      const payload = { id: userByEmail.id, email: userByEmail.email };

      const { password, ...response } = userByEmail;
      return {
        user: response,
        accessToken: await this.jwtService.signAsync(payload),
      };
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
