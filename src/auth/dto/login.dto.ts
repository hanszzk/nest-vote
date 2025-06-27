import { IsNotEmpty, MaxLength } from "class-validator";


export class LoginDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @MaxLength(20)
    ssn: string;
}