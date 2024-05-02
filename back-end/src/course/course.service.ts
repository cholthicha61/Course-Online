import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import * as _ from 'lodash';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import * as sizeOf from 'image-size';
import { throwError } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private catagoryRepository: Repository<Category>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const findCourse = await this.courseRepository.findOne({
        where: {
          courseName: createCourseDto.courseName,
        },
      });
      if (!_.isEmpty(findCourse)) {
        throw new HttpException(`course ${createCourseDto.courseName} already exists`, HttpStatus.CONFLICT);
      }

      const findCategory = await this.catagoryRepository.findOne({
        where: {
          id: createCourseDto.categoryId,
        },
      });

      if (_.isEmpty(findCategory)) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const findImage = await this.courseRepository.findOne({
        where: {
          courseImage: createCourseDto.courseImage,
        },
      });

      if (_.isEmpty(findImage)) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }

      const createCourse = this.courseRepository.create({
        ...createCourseDto,
        categorys: findCategory,
      });
      return await this.courseRepository.save(createCourse);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.courseRepository.find({
        relations: {
          images: true,
          categorys: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        relations: {
          images: true,
          categorys: true,
        },
      });
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
      const course = await this.courseRepository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.images', 'images')
        .where('course.courseName = :courseName', { courseName })
        .getOne();
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
      const currentPriority = course.priority;
      this.courseRepository.merge(course, updateCourseDto);

      if (updateCourseDto.priority !== undefined && updateCourseDto.priority !== currentPriority) {
        const coursesToUpdate = await this.courseRepository.find({
          where: {
            priority: updateCourseDto.priority,
            id: Not(id),
          },
        });
        for (const courseToUpdate of coursesToUpdate) {
          courseToUpdate.priority++;
          await this.courseRepository.save(courseToUpdate);
        }
      }

      return await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }

  async updateStatusCourse(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.findOne(id);

      course.status = updateCourseDto.status;

      return await this.courseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }
  async updatePriority(id: number, newPriority: number) {
    try {
      const courseToUpdate = await this.findOne(id);
      if (!courseToUpdate) {
        throw new NotFoundException(`Course ${id} does not exist`);
      }
      const oldPriority = courseToUpdate.priority;
      courseToUpdate.priority = newPriority;
      await this.courseRepository.save(courseToUpdate);

      const coursesToAdjust = await this.courseRepository.find({
        where: {
          priority: MoreThanOrEqual(oldPriority),
          id: Not(id),
        },
      });
      for (const course of coursesToAdjust) {
        if (newPriority < oldPriority) {
          course.priority++;
        } else {
          course.priority--;
        }
        await this.courseRepository.save(course)
      }
      return courseToUpdate;
    } catch (error) {
      throw error;
    }
  }

  async createCourseImage(fileName: string, createCourseDto: CreateCourseDto) {
    try {
      console.log('fileName is ', fileName);
      console.log('createCourseDto is ', createCourseDto);

      const courseImage = this.courseRepository.create({
        courseName: createCourseDto.courseName,
        courseImage: fileName,
        description: createCourseDto.description,
        price: createCourseDto.price,
        priority: createCourseDto.priority,
      });
      return await this.courseRepository.save(courseImage);
    } catch (error) {
      throw error;
    }
  }

  //ดูว่าลบรูปแล้วต้องลบในโฟลเดอร์ be ด้วย
  async createCourseImages(files: any[], createCourseDto: CreateCourseDto) {
    try {
      const saveImgs = [];
      for (const file of files) {
        console.log(file.filename);
        const createImg = this.imageRepository.create({
          name: file.filename,
        });
        const saveImg = await this.imageRepository.save(createImg);
        saveImgs.push(saveImg);
      }
      const courseImage = this.courseRepository.create({
        courseName: createCourseDto.courseName,
        description: createCourseDto.description,
        price: createCourseDto.price,
        priority: createCourseDto.priority,
        images: saveImgs,
      });
      return await this.courseRepository.save(courseImage);
    } catch (error) {
      throw error;
    }
  }
}
