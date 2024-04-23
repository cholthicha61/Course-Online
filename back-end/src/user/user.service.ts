import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
      return await this.userRepository.save(user);
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    try {
      //don't return password on postman
      return await this.userRepository.find();
    } catch (error) {
      throw error
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
    try {
      const findByEmail = await this.userRepository.findOne({ where: { email } });
      return findByEmail;
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findOne(id);
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      throw error
    }
  }

  async remove(id: number): Promise<void> { //update activate 
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw error
    }
  }
}
