import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import * as _ from 'lodash';
import { Category } from 'src/category/entities/category.entity';
import { Image } from 'src/image/entities/image.entity';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises';
import { FindAllCourseDto } from './dto/find-all-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Category)
    private catagoryRepository: Repository<Category>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>
  ) { }

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

  async findAll(keyword: FindAllCourseDto) {
    try {
      
      const findAllCourse = await this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.categorys', 'category')
      .leftJoinAndSelect('course.images', 'images')
      .leftJoinAndSelect('course.orders', 'orders')
      if (keyword?.categorys == 'true') {
        findAllCourse.leftJoinAndSelect('course.categorys', 'category')
      }
      if (keyword?.images == 'true') {
        findAllCourse.leftJoinAndSelect('course.images', 'images')
      }
      if (keyword?.orders == 'true') {
        findAllCourse.leftJoinAndSelect('course.orders', 'orders')
      }
      findAllCourse.where('1=1')
      if (keyword?.courseName) {
        findAllCourse.andWhere('course.courseName like :courseName', { courseName: `%${keyword?.courseName}%` })
      }
      if (keyword?.orderById) {
        findAllCourse.orderBy('course.id', `${!_.isEmpty(keyword?.orderById) ? keyword?.orderById : 'ASC'}`)
      }
      if (keyword?.limit){
        findAllCourse.take(+keyword?.limit)
      } 

      return  await findAllCourse.getMany();

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

  async createCourse(files: any[], createCourseDto: CreateCourseDto) {
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
    const filePath = `${FOLDERPATH.Imgs}/${filename}` 
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
