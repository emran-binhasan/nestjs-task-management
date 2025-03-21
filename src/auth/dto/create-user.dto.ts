import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class authCredentialsDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  userName: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: 'Password is too weak !',
  })
  password: string;
}
