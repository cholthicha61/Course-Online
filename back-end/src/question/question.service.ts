 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId: number): Promise<Question> {
    console.log("createQuestionDto",createQuestionDto);
    console.log("userId",userId);

    
    
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createQuestionDto.userId,
        },
      });

      if (_.isEmpty(user)) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const question = this.questionRepository.create({
        message: createQuestionDto.message,
        user: user
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

  // async findByUserId(id: number): Promise<Question> {
  //   try {
  //     const findByUserId = await this.questionRepository.findOne({ where: { id } });
  //     if (_.isEmpty(findByUserId)) {
  //       throw new HttpException('User ID not found', HttpStatus.NOT_FOUND);
  //     }
  //     return findByUserId;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async remove(id: number) {
    try {
      const question = await this.findOne(id);
      question.deletedAt = new Date(); // Mark as soft deleted
      await this.questionRepository.save(question);
    } catch (error) {
      throw error;
    }
  }
}
