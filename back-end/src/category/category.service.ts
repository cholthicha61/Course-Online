import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

Injectable();
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
      if (existingCategory) {
        throw new HttpException(`Category with name ${createCategoryDto.name} already exists`, HttpStatus.CONFLICT);
      }
      const category = this.categoryRepository.create({
        ...createCategoryDto,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ where: { name } });
      if (!category) {
        throw new NotFoundException(`Category with name ${name} not found`);
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(id);
      this.categoryRepository.merge(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const category = await this.findOne(id);
      console.log(`Removing category with ID ${id}`);
      await this.categoryRepository.remove(category);
    } catch (error) {
      throw error;
    }
  }
}
