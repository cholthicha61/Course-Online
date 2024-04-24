import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Role } from 'src/role/entities/role.entity';
import { response } from 'express';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOneTest(username: string) {
    return this.users.find((user) => user.username === username);
  }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto, roleId: number) {
    try {
      const findByEmail = await this.userRepository.findOne({
        where: {
          email: createUserDto.email
        }
      });
      if (!_.isEmpty(findByEmail)) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }

      const findRole = await this.roleRepository.findOne({
        where: {
          id: createUserDto.roleId
        }
      });
      if (_.isEmpty(findRole)) {
        throw new HttpException('role not found', HttpStatus.NOT_FOUND);
      }

      const hashPass = new User();
      const createUser = this.userRepository.create({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        phone: createUserDto.phone,
        email: createUserDto.email,
        password: await hashPass.hashPassword(createUserDto.password, 10),
        roles: findRole
      })
      const userSave = await this.userRepository.save(createUser)

      const { password, ...response } = userSave;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {

      const allUser = await this.userRepository.find();
      const response = allUser.map(user => {
        const { password, ...response } = user;
        return response;
      });

      return response;

    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error
    }

  }

  async findByEmail(email: string) {
    console.log(email);
    try {
      const findByEmail = await this.userRepository.findOne({ where: { email } });
      if (_.isEmpty(findByEmail)) {
        throw new HttpException('Email not found', HttpStatus.UNAUTHORIZED);
      }

      return findByEmail;
    } catch (error) {
      throw error;
    }
  }
  //edit เอา id dto > findone get role id>>
  //add updat status
  async update(id: number, updateUserDto: UpdateUserDto, roleId: number) {
    try {
      const user = await this.findOne(id);

      const findRole = await this.roleRepository.findOne({
        where: {
          id: roleId
        }
      });
      if (_.isEmpty(findRole)) {
        throw new HttpException('role not found', HttpStatus.NOT_FOUND);
      }

      user.fname = updateUserDto.fname;
      user.lname = updateUserDto.lname;
      user.phone = updateUserDto.phone;
      user.email = updateUserDto.email;

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      user.roles = findRole;

      const updatedUser = await this.userRepository.save(user);
      const { password, ...response } = updatedUser;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    //update activate
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
