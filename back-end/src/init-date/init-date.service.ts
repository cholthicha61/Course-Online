import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesUser, UserInit } from 'src/constant/init-user';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InitDateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {
    this.initUser()
  }

  async initUser() {
    try {
      const roleUser = await this.roleRepository.count()
      if (roleUser == 0) {
        const createRoleAdmin = this.roleRepository.create({
          name: RolesUser.Admin
        })
        await this.roleRepository.save(createRoleAdmin)
        const createRoleUser = this.roleRepository.create({
          name: RolesUser.User
        })
        await this.roleRepository.save(createRoleUser)
      }
      const user = await this.userRepository.count()
      if (user == 0) {
        const role = await this.roleRepository.findOne({
          where: {
            name: RolesUser.Admin
          }
        })
        const hashPass = new User();
        const createUser = this.userRepository.create({
          fname: UserInit.fname,
          lname: UserInit.lname,
          phone: UserInit.phone,
          email: UserInit.email,
          password: await hashPass.hashPassword(UserInit.password, 10),
          roles: role,
        });
        await this.userRepository.save(createUser);
      }

    } catch (error) {
      throw error
    }
  }

}
