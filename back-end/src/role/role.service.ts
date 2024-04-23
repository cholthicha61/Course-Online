import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
    });
  }

  async create(createRoleDto: CreateRoleDto) {
    const createRolename = this.roleRepository.create({
      name: createRoleDto.name,
    });
    await this.roleRepository.save(createRolename);
    return 'This action adds a new name';
  }

  async update(id: number, updateRole: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRole);
  }

  // async remove(id: number) {
  //   const removeRolename = await this.findOne(id);
  //   if(!removeRolename) {
  //     throw new NotFoundException();
  //   }
  //   return await this.roleRepository.remove(removeRolename);
  // }
}
