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
    console.log(createUserDto);
    return await this.userService.create(createUserDto, roleId);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('email/:email')
  async findByEmail(@Query('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const roleId = updateUserDto.roleId;
    return await this.userService.update(+id, updateUserDto, roleId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(+id);
  }
}
