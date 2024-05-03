import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { unlink } from 'fs/promises';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FOLDERPATH } from 'src/constant/folder-path';
import { uniqueSuffixString } from 'src/func/unique-string';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    console.log(createCourseDto);
    return await this.courseService.create(createCourseDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() keyword) {
    return await this.courseService.findAll(keyword);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(AuthGuard)
  @Patch('update-status/:id')
  async updateStatusCourse(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.updateStatusCourse(id, updateCourseDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':update-priority/:id')
  async updatePriority(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.courseService.updatePriority(+id, updateCourseDto.priority);
  }

  @UseGuards(AuthGuard)
  @Post('/uploads')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: FOLDERPATH.Imgs, // แก้เป็น path ที่ต้องการเก็บไฟล์
        filename: (req, file, cb) => {
          console.log('file is ', file);

          const uniqueSuffix = uniqueSuffixString();
          const extension = path.extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        },
      }),
    })
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() createCourseDto: CreateCourseDto) {
    // ตรวจสอบประเภทของไฟล์ที่อัปโหลด
    const allowedFileTypes = ['.png', '.jpeg', '.jpg'];
    const response = {
      successfully: [],
      failed: [],
    };
    console.log(files);

    const successFile = [];
    for (const file of files) {
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedFileTypes.includes(extension)) {
        const filePath = `${FOLDERPATH.Imgs}/${file.filename}`; //ดูฟังก์ชั่นนี้เพื่อลบไฟล์
        try {
          await unlink(filePath); // ใช้ unlink เพื่อลบไฟล์
          console.log(`File ${filePath} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
          throw new Error(`Failed to delete file ${filePath}`);
        }
        // throw new BadRequestException('Invalid file type');
        response.failed.push(file.originalname);
      } else {
        successFile.push(file);
        response.successfully.push(file.originalname);
      }
    }
    console.log('files is ', successFile);

    const course = await this.courseService.createCourse(successFile, createCourseDto);
    return course;
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await this.courseService.deleteCourse(+id);
  }
}
