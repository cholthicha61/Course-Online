import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllUserDto } from './dto/find-all-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Query('roleId') roleId: number) {
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
}
