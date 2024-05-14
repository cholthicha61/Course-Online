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
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const findByEmail = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (!_.isEmpty(findByEmail)) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }

      const findRole = await this.roleRepository.findOne({
        where: {
          name: RolesUser.User,
        },
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
        favoriteCourses: [],
        password: await hashPass.hashPassword(createUserDto.password, 10),
        roles: findRole,
      });

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

      const findAllUsers = await this.userRepository.createQueryBuilder('user');
      if (keyword?.role == 'true') {
        findAllUsers.leftJoinAndSelect('user.roles', 'roles');
      }
      if (keyword?.orders == 'true') {
        findAllUsers.leftJoinAndSelect('user.orders', 'orders');
      }
      if (keyword?.questions == 'true') {
        findAllUsers.leftJoinAndSelect('user.questions', 'questions');
      }
      if (keyword?.favoriteCourses === 'true') {
        findAllUsers.leftJoinAndSelect('user.favoriteCourses', 'favoriteCourses');
      }
      findAllUsers.where('1=1');
      if (keyword?.fname) {
        findAllUsers.andWhere('user.fname like :fname', { fname: `%${keyword?.fname}%` });
      }
      if (keyword?.email) {
        findAllUsers.andWhere('user.email like :email', { email: `%${keyword?.email}%` });
      }
      if (keyword?.phone) {
        findAllUsers.andWhere('user.phone like :phone', { phone: `%${keyword?.phone}%` });
      }
      if (keyword?.lname) {
        findAllUsers.andWhere('user.lname like :lname', { lname: `%${keyword?.lname}%` });
      }
      if (keyword?.orderById) {
        findAllUsers.orderBy('user.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`);
      }
      if (keyword?.limit) {
        findAllUsers.take(+keyword?.limit);
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
          id,
        },
        relations: {
          questions: true,
          roles: true,
          favoriteCourses:true
        },
      });
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
          name: RolesUser.User,
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

      console.log('user', user);

      const updatedUser = await this.userRepository.save(user);
      const { password, ...response } = updatedUser;
      return response;
    } catch (error) {
      throw error;
    }
  }
  async markCourseAsFavorite(userId: number, courseId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoriteCourses'],
      });
      const course = await this.courseRepository.findOne({ where: { id: courseId } });

      if (!user || !course) {
        throw new NotFoundException('User or course not found.');
      }

      if (!user.favoriteCourses) {
        user.favoriteCourses = [];
      }

      if (!user.favoriteCourses.some((favCourse) => favCourse.id === courseId)) {
        user.favoriteCourses.push(course);
        await this.userRepository.save(user);
      }
      
    } catch (error) {
      throw new HttpException(
        'An error occurred while marking the course as favorite',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async unmarkCourseAsFavorite(userId: number, courseId: number): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoriteCourses'],
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });

      if (!course) {
        throw new NotFoundException('Course not found.');
      }

      await this.userRepository.createQueryBuilder().relation(User, 'favoriteCourses').of(user).remove(course);
    } catch (error) {
      throw new HttpException(
        'An error occurred while unmarking the course as favorite',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFavoriteCourses(userId: number): Promise<Course[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoriteCourses'],
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user.favoriteCourses || [];
    } catch (error) {
      throw error;
    }
  }
  async getAllUsersWithFavoriteCourses() {
    try {
      const users = await this.userRepository.find({
        relations: ['favoriteCourses'],
      });

      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      throw new HttpException(
        'An error occurred while retrieving users with favorite courses',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  // async getAllCoursesWithFavoriteUsers(): Promise<any[]> {
  //   try {
  //     console.log('Executing getAllCoursesWithFavoriteUsers method');
  //     const courses = await this.courseRepository.createQueryBuilder('course')
  //       .leftJoinAndSelect('course.favoriteByUsers', 'user')
  //       .select([
  //         'course.id',
  //         'course.title',
  //         'course.description',
  //         'user.id',
  //         'user.fname',
  //         'user.lname',
  //         'user.email',
  //       ])
  //       .getMany();
  
  //     console.log('Courses retrieved:', courses);
  
  //     return courses.map(course => {
  //       const { favoriteByUsers, ...courseWithoutUsers } = course;
  //       return {
  //         ...courseWithoutUsers,
  //         favoriteByUsers: favoriteByUsers.map(user => {
  //           const { password, ...userWithoutPassword } = user;
  //           return userWithoutPassword;
  //         }),
  //       };
  //     });
  //   } catch (error) {
  //     console.error('Error retrieving courses with favorite users:', error);
  //     throw new HttpException(
  //       'An error occurred while retrieving courses with favorite users',
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }
}
