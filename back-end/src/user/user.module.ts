import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleController } from 'src/role/role.controller';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageController } from 'src/image/image.controller';
import { ImageService } from 'src/image/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, ])],
  controllers: [UserController, RoleController, ],
  providers: [UserService, RoleService, ],
})
export class UserModule { }
