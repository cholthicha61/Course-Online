import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles, NotFoundException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { unlink } from 'fs/promises';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FOLDERPATH } from 'src/constant/folder-path';
import { uniqueSuffixString } from 'src/func/unique-string';
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

  @Patch('update-status/:id')
  async updateStatusCourse(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.updateStatusCourse(id, updateCourseDto);
  }

  @Post('/uploads')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
      filename: (req, file, cb) => {

        console.log("file is ", file);

        const uniqueSuffix = uniqueSuffixString();
        const extension = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() createCourseDto: CreateCourseDto) {
    // ตรวจสอบประเภทของไฟล์ที่อัปโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const response = {
      successfully: [],
      failed: []
    }
    const successFile = []
    for (const file of files) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedFileTypes.includes(extension)) {
        const filePath = `${FOLDERPATH.Imgs}/${file.filename}` //ดูฟังก์ชั่นนี้เพื่อลบไฟล์
        try {
          await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
          console.log(`File ${filePath} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
          throw new Error(`Failed to delete file ${filePath}`);
        }
        // throw new BadRequestException('Invalid file type');
        response.failed.push(file.originalname)
      } else {
        successFile.push(file)
        response.successfully.push(file.originalname)
      }
    }
    console.log("files is ", successFile);

    const course = await this.courseService.createCourseImages(successFile, createCourseDto)
    return course;
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await this.courseService.deleteCourse(+id);
  }

}
