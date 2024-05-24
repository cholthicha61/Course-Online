import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto, CreateQuestionNonLoginDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post('question-non-login')
  async createQuestionNonLogin(@Body() createQuestionNonLoginDto: CreateQuestionNonLoginDto) {
    return this.questionService.createQuestionNonLogin(createQuestionNonLoginDto);
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Query('user_id') userId: number) {
    return await this.questionService.create(createQuestionDto, userId);
  }

  @Get('/count-question')
  async countQuestion() {
    try {
      const count = await this.questionService.countQuestion();
      return { count };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }
  @Get('user/:id')
  async findByUserId(@Query('user_id') userId: number) {
    return await this.questionService.findOne(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
