import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as _ from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { StatusOrder } from 'src/enums/status-order';

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
        status: StatusOrder.Waiting,
        startdate: createOrderDto.startdate,
        enddate: createOrderDto.enddate,
        user: findUser,
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
          user: true,
          course: true,
        },
        order: {
          id: 'ASC',
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
          user: true,
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

      order.startdate = updateOrderDto.startdate;
      order.enddate = updateOrderDto.enddate;
      order.user = findUser;
      order.course = findCourse;

      const updateOrder = await this.orderRepository.save(order);
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(id);
      // function convertStatusOrder(status: string): StatusOrder {
      //   switch (status) {
      //     case 'Waiting':
      //       return StatusOrder.Waiting;
      //     case 'Incourse':
      //       return StatusOrder.Incourse;
      //     case 'Endcourse':
      //       return StatusOrder.Endcourse;
      //     case 'Canceled':
      //       return StatusOrder.Canceled;
      //     default:
      //       throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
      //   }
      // }

      function convertStatusOrder(status: string): StatusOrder {
        const statusMap: { [key: string]: StatusOrder } = {
          Waiting: StatusOrder.Waiting,
          Incourse: StatusOrder.Incourse,
          Endcourse: StatusOrder.Endcourse,
          Canceled: StatusOrder.Canceled,
        };
        if (statusMap.hasOwnProperty(status)) {
          return statusMap[status];
        }
        throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
      }
      // ใช้ฟังก์ชัน convertStatusOrder เพื่อแปลงค่า string เป็น StatusOrder
      order.status = convertStatusOrder(updateOrderDto.status);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw error;
    }
  }
}
 