import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto, CreateQuestionNonLoginDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { User } from 'src/user/entities/user.entity';
import { response } from 'express';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createQuestionDto: CreateQuestionDto, userId: number): Promise<Omit<Question, 'user'>> {
    console.log('createQuestionDto', createQuestionDto);
    console.log('userId', userId);

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
        user: user,
        email: user.email,
      });

      const questionSave = await this.questionRepository.save(question);

      const { password, ...filteredUser } = user;
      const response = {
        ...questionSave,
        user: filteredUser,
      };


      return response
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Omit<Question, 'user'>[]> {
    try {
      const question = await this.questionRepository.find({
        relations: ['user'],
      });

      const response = question.map(question => {
        if (question.user) {
          const { password, ...filteredUser } = question.user;
          return {
            ...question,
            user: filteredUser,
          };
        } else {
          return question;
        }
      });

      return response
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Omit<Question, 'user'> | null> {
    try {
      const question = await this.questionRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (_.isEmpty(question)) {
        throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
      }

      const { password, ...filteredUser } = question.user;
      const response = {
        ...question,
        user: filteredUser,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const question = await this.findOne(id);
      question.deletedAt = new Date(); // Mark as soft deleted
      await this.questionRepository.save(question);
    } catch (error) {
      throw error;
    }
  }

  async createQuestionNonLogin(createQuestionNonLoginDto: CreateQuestionNonLoginDto) {
    try {
      const question = this.questionRepository.create({
        message: createQuestionNonLoginDto.message,
        email: createQuestionNonLoginDto.email,
      });

      const questionSave = await this.questionRepository.save(question);

      return questionSave;
    } catch (error) {
      throw error;
    }
  }

}
