import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllUserDto } from './dto/find-all-dto';
import * as path from 'path';
import { FOLDERPATH } from 'src/constant/folder-path';
import { unlink } from 'fs/promises';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uniqueSuffixString } from 'src/func/unique-string';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto >>>", createUserDto);
    return await this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() keyword: FindAllUserDto) {
    return await this.userService.findAll(keyword);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const roleId = updateUserDto.roleId;
    return await this.userService.update(+id, updateUserDto, roleId);
  }

  @UseGuards(AuthGuard)
  @Patch('update-status/:id')
  async updateStatusUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Body('active') active: boolean
  ) {
    return await this.userService.updateStatusUser(id, updateUserDto, active);
  }

  @UseGuards(AuthGuard)
  @Post('teacher-profile')
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
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() createTeacherProfileDto: CreateTeacherProfileDto) {
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

    const course = await this.userService.createTeacherProfile(successFile, createTeacherProfileDto);
    return course;
  }

}
