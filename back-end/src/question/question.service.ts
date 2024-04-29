import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    try { 
      const question = await this.questionRepository.create({
        message: createQuestionDto.message,
      });
      return await this.questionRepository.save(question);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Question[]> {
    try {
      return this.questionRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Question> {
    try {
      const findById = await this.questionRepository.findOne({
        where: { id: id },
      });
      if (_.isEmpty(findById)) {
        throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
      }
      return findById;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(id: number): Promise<Question> {
    try {
      const findByUserId = await this.questionRepository.findOne({ where: { id } });
      if (_.isEmpty(findByUserId)) {
        throw new HttpException('User ID not found', HttpStatus.NOT_FOUND);
      }
      return findByUserId;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const question = await this.findOne(id);
      return await this.questionRepository.remove(question);
    } catch (error) {
      throw error;
    }
  }
}
