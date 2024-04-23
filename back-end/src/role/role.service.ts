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
    try {
      return this.roleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.roleRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const createRolename = this.roleRepository.create({
        name: createRoleDto.name,
      });
      await this.roleRepository.save(createRolename);
      return 'This action adds a new name';
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRole: UpdateRoleDto) {
    try {
      return this.roleRepository.update(id, updateRole);
    } catch (error) {
      throw error;
    }
  }
}
