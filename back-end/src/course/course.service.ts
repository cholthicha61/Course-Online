import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import * as _ from 'lodash';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) { }
  async create(createCourseDto: CreateCourseDto) {
    try {
      const findCourse = await this.courseRepository.findOne({
        where: {
          courseName: createCourseDto.courseName
        }
      });
      if (!_.isEmpty(findCourse)) {
        throw new HttpException(`course ${createCourseDto.courseName} already exists`, HttpStatus.CONFLICT);
      }

      const createCourse = this.courseRepository.create({
        ...createCourseDto,
      });
      return await this.courseRepository.save(createCourse);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.courseRepository.findOne({ where: { id } });
      if (_.isEmpty(course)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      return course;
    } catch (error) {
      throw error;
    }
  }

  async findByName(courseName: string) {
    try {
      const course = await this.courseRepository.findOne({ where: { courseName } })
      if (_.isEmpty(course)) {
        throw new HttpException(`course name: ${courseName} not found`, HttpStatus.NOT_FOUND);
      }
      return course;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.findOne(id);
      this.courseRepository.merge(course, updateCourseDto);
      return await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, courseName: string) {
    try {
      const course = await this.findOne(id);
      console.log(`delete course ${id} ${courseName}`);
      await this.courseRepository.remove(course);
    } catch (error) {
      throw error;
    }
  }

  async updateStatusCourse(id: number, updateCourseDto: UpdateCourseDto){
    try {
      const course = await this.findOne(id);

      course.status = updateCourseDto.status;

      return await this.courseRepository.save(course); ;
    } catch (error) {
      throw error;
    }
  }
}
