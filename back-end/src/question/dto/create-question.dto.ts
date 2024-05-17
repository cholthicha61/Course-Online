import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  message?: string;
  @IsNotEmpty()
  @IsNumber()
  userId?: number;
}

export class CreateQuestionNonLoginDto{
  
  @IsString()
  message?: string;
}
