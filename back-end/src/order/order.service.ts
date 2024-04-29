import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as _ from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const findUser = await this.userRepository.findOne({
        where: {
          id: createOrderDto.userId,
        },
      });
      if (_.isEmpty(findUser)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const findCourse = await this.courseRepository.findOne({
        where: {
          id: createOrderDto.courseId,
        },
      });
      if (_.isEmpty(findCourse)) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const createOrder = this.orderRepository.create({
        status: createOrderDto.status,
        startdate: createOrderDto.startdate,
        enddate: createOrderDto.enddate,
        users: findUser,
        course: findCourse,
      });

      return await this.orderRepository.save(createOrder);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.orderRepository.find({
        relations: {
          users: true,
          course: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const findOne = await this.orderRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          users: true,
          course: true,
        },
      });
      if (_.isEmpty(findOne)) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return findOne;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userId: number, courseId: number) {
    try {
      const order = await this.findOne(id);
      const findUser = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      if (_.isEmpty(findUser)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const findCourse = await this.courseRepository.findOne({
        where: {
          id: courseId,
        },
      });
      if (_.isEmpty(findCourse)) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      order.status = updateOrderDto.status;
      order.startdate = updateOrderDto.startdate;
      order.enddate = updateOrderDto.enddate;
      order.users = findUser;
      order.course = findCourse;

      const updateOrder = await this.orderRepository.save(order);
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }
}
