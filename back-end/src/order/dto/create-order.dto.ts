import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  status?: string;

  @IsNotEmpty()
  @IsString()
  startdate?: string;

  @IsNotEmpty()
  @IsString()
  enddate?: string;

  userId?: number;

  courseId?: number;
}
