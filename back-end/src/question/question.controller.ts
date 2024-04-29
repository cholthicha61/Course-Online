import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Query('user_id') userId: number) {
    return await this.questionService.create(createQuestionDto, userId);
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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
  //   return this.questionService.update(+id, updateQuestionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
