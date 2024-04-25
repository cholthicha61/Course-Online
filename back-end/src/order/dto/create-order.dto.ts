import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  status: boolean;

  @IsNotEmpty()
  @IsString()
  startdate: string;

  @IsNotEmpty()
  @IsString()
  enddate: string;

  courseId: number;

  userID: number;
}
