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
import { FindAllOrderDto, FindAllUserDto } from 'src/user/dto/find-all-dto';

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
        user: findUser,
        course: findCourse,
      });

      return await this.orderRepository.save(createOrder);
    } catch (error) {
      throw error;
    }
  }

  async findAll(keyword: FindAllOrderDto) {
    try {
      console.log('keyword', keyword);

      const findAllOrders = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.course', 'course')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('course.categorys', 'categorys')
        .leftJoinAndSelect('course.images', 'images');
      findAllOrders.where('1=1');
      if (keyword?.status) {
        findAllOrders.andWhere('order.status like :status', { status: `%${keyword?.status}%` });
      }
      if (keyword?.startdate) {
        findAllOrders.andWhere('order.startdate like :startdate', { startdate: `%${keyword?.startdate}%` });
      }
      if (keyword?.enddate) {
        findAllOrders.andWhere('order.enddate like :enddate', { enddate: `%${keyword?.enddate}%` });
      }
      if (keyword?.courseName) {
        findAllOrders.andWhere('course.courseName like :courseName', { courseName: `%${keyword?.courseName}%` });
      }
      if (keyword.description) {
        findAllOrders.andWhere('course.description like :description', { description: `%${keyword?.description}%` });
      }
      if (keyword.orderById) {
        findAllOrders.orderBy('order.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`);
      }
      if (keyword?.limit) {
        findAllOrders.take(+keyword?.limit);
      }

      return await findAllOrders.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .leftJoinAndSelect('order.course', 'course')
        .leftJoinAndSelect('course.categorys', 'categorys')
        .leftJoinAndSelect('course.images', 'images')
        .where('order.id = :id', { id })
        .getOne();

      if (_.isEmpty(order)) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return order;
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

      const updateOrder = await this.orderRepository.save(order);
      return updateOrder;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(id);

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
