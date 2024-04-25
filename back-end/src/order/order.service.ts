import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = this.orderRepository.create({
        status: createOrderDto.status,
        startdate: createOrderDto.startdate,
        enddate: createOrderDto.enddate,
        
      });
      await this.orderRepository.save(createOrder);
      return 'This action adds a new order';
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.orderRepository.find();
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
      });
      if (_.isEmpty(findOne)) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return findOne;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrder: UpdateOrderDto) {
    try {
      const findById = await this.orderRepository.find({
        where: {
          id: id,
        },
      });
      if (_.isEmpty(findById)) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      await this.orderRepository.update(id, updateOrder);
      return 'This order has been updated';
    } catch (error) {
      throw error;
    }
  }
}
