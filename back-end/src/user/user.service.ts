import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {

    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.findOne(id);
      await this.userRepository.update(id, updateUserDto);
      return await this.findOne(id);
    } catch (error) {
      throw error
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch (error) {
      throw error
    }
  }
}
