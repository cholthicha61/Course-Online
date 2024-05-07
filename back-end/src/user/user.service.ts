import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Role } from 'src/role/entities/role.entity';
import { response } from 'express';
import { FindAllUserDto } from './dto/find-all-dto';
import { RolesUser, UserInit } from 'src/constant/init-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      console.log("1");
      
      const findByEmail = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },

      });
      console.log("2");

      if (!_.isEmpty(findByEmail)) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }
      console.log("3");

      const findRole = await this.roleRepository.findOne({
        where: {
          id: createUserDto.roleId,
        },
      });
      if (_.isEmpty(findRole)) {
        throw new HttpException('role not found', HttpStatus.NOT_FOUND);
      }
      console.log("4");

      const hashPass = new User();
      const createUser = this.userRepository.create({
        fname: createUserDto.fname,
        lname: createUserDto.lname,
        phone: createUserDto.phone,
        email: createUserDto.email,
        password: await hashPass.hashPassword(createUserDto.password, 10),
        roles: findRole,
      });
      console.log("5");

      const userSave = await this.userRepository.save(createUser);

      const { password, ...response } = userSave;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(keyword: FindAllUserDto) {
    try {
      console.log('keyword', keyword);

      const findAllUsers = await this.userRepository.createQueryBuilder('user')
      if (keyword?.role == 'true') {
        findAllUsers.leftJoinAndSelect('user.roles', 'roles')
      }
      if (keyword?.orders == 'true') {
        findAllUsers.leftJoinAndSelect('user.orders', 'orders')
      }
      if (keyword?.questions == 'true') {
        findAllUsers.leftJoinAndSelect('user.questions', 'questions')
      }
      findAllUsers.where('1=1')
      if (keyword?.fname) {
        findAllUsers.andWhere('user.fname like :fname', { fname: `%${keyword?.fname}%` })
      }
      if (keyword?.email) {
        findAllUsers.andWhere('user.email like :email', { email: `%${keyword?.email}%` })
      }
      if (keyword?.phone) {
        findAllUsers.andWhere('user.phone like :phone', { phone: `%${keyword?.phone}%` })
      }
      if (keyword?.lname) {
        findAllUsers.andWhere('user.lname like :lname', { lname: `%${keyword?.lname}%` })
      }
      if (keyword?.orderById) {
        findAllUsers.orderBy('user.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`)
      }
      if (keyword?.limit) {
        findAllUsers.take(+keyword?.limit)
      }
      const users = await findAllUsers.getMany();

      const response = users.map((user) => {
        const { password, ...response } = user;
        return response;
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {

      const user = await this.userRepository.findOne({
        where: {
          id
        },
        relations: {
          questions: true,
          roles: true
        }
      })
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      const { password, ...response } = user;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateStatusUser(id: number, updateUserDto: UpdateUserDto, active: boolean) {
    try {
      const user = await this.findOne(id);

      user.active = updateUserDto.active;

      const updateStatus = await this.userRepository.save(user);
      const { password, ...response } = updateStatus;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, roleId: number) {
    try {
      const user = await this.findOne(id);

      const findRole = await this.roleRepository.findOne({
        where: {
          id: roleId,
        },
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

      console.log("user",user);
      

      const updatedUser = await this.userRepository.save(user);
      const { password, ...response } = updatedUser;
      return response;
    } catch (error) {
      throw error;
    }
  }
}
