import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UserController } from 'src/user/user.controller';
import { CourseController } from 'src/course/course.controller';
import { UserService } from 'src/user/user.service';
import { CourseService } from 'src/course/course.service';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Course, Role])],
  controllers: [OrderController, UserController, CourseController],
  providers: [OrderService, UserService, CourseService],
})
export class OrderModule {}
