import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeacherProfileDto {

    @IsNotEmpty()
    @IsString()
    fname?: string;

    @IsNotEmpty()
    @IsString()
    lname?: string;

    @IsNotEmpty()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    email?: string;

    userImage?: string;

    @IsString()
    desc?: string;

}
