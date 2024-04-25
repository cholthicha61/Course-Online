import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    return await this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(+id);
  }

  @Get('/courseName/:courseName')
  async findByName(@Param('courseName') courseName: string) {
    return await this.courseService.findByName(courseName);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, courseName: string) {
    return await this.courseService.remove(+id, courseName);
  }

  @Patch('update-status/:id')
  async updateStatusCourse(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.updateStatusCourse(id, updateCourseDto);
  }
}
