import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

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
  async findAll(@Query() keyword) {
    return await this.userService.findAll(keyword);
  }

  // @Get('email')
  // async findByEmail(@Query() keyword) {
  //   return await this.userService.findByEmail(keyword);
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,
  ) {
    const roleId = updateUserDto.roleId;
    return await this.userService.update(+id, updateUserDto, roleId);
  }

  @Patch('update-status/:id')
  async updateStatusUser(@Param('id')id: number, 
  @Body() updateUserDto: UpdateUserDto, @Body('active') active: boolean) {
    return await this.userService.updateStatusUser(id, updateUserDto, active);
  }
}
