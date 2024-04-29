import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseName?: string;
  courseImage?: string;
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price?: number;

  status?: boolean;
  @IsNumber()
  priority?: number;
}
