import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import * as _ from 'lodash';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises';

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

  async createNewPriority() {
    // Find maximum priority in database
    const findMaxPriority = await this.courseRepository
      .createQueryBuilder('course')
      .select('MAX(course.priority)', 'maxPriority')
      .getRawOne();

    // create new priority
    let newPriority = 1;
    if (findMaxPriority && findMaxPriority.maxPriority !== null) {
      newPriority = findMaxPriority.maxPriority + 1;
    }

    return newPriority;
  }

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

      const newPriority = await this.createNewPriority();
      const createCourse = this.courseRepository.create({
        courseName: createCourseDto.courseName,
        description: createCourseDto.description,
        price: createCourseDto.price,
        priority: newPriority,
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
      this.courseRepository.merge(course, updateCourseDto);
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

  //ดูว่าลบรูปแล้วต้องลบในโฟลเดอร์ be ด้วย 
  async createCourseImages(files: any[], createCourseDto: CreateCourseDto) {
    try {
      const saveImgs = []
      for (let i = 1; i < files.length; i++) {
        console.log(i);
        const createImg = this.imageRepository.create({
          name: files[i].filename
        })
        const saveImg = await this.imageRepository.save(createImg)
        saveImgs.push(saveImg)
      }
      const newPriority = await this.createNewPriority();
      const courseImage = this.courseRepository.create({
        courseImage: files[0].filename,
        courseName: createCourseDto.courseName,
        description: createCourseDto.description,
        price: createCourseDto.price,
        priority: newPriority,
        images: saveImgs,
      });
      return await this.courseRepository.save(courseImage);
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(filename: string) {
    const filePath = `${FOLDERPATH.Imgs}/${filename}` //ดูฟังก์ชั่นนี้เพื่อลบไฟล์
    try {
      await unlink(filePath); // Use 'unlink' to delete the file
      console.log(`File ${filePath} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error);
    }
  }

  async deleteCourse(id: number) {
    try {
      console.log(id);

      const course = await this.courseRepository.findOne({ where: { id }, relations: ['images'] });
      if (_.isEmpty(course)) {
        throw new HttpException('course not found', HttpStatus.NOT_FOUND);
      }
      if (!_.isEmpty(course.courseImage)) {
        await this.deleteFile(course.courseImage)
      }
      if (!_.isEmpty(course.images)) {
        for (const image of course.images) {
          await this.deleteFile(image.name);
        }
      }

      await this.courseRepository.delete(id);
    } catch (error) {
      throw error
    }
  }

}
