import { IsNotEmpty, MaxLength } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @MaxLength(20)
    ssn: string;
}