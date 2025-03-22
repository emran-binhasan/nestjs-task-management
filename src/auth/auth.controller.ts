import { Body, Controller, Post } from '@nestjs/common';
import { authCredentialsDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/signup')
    signUp(@Body() authCredentialsDto:authCredentialsDto){
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signIn')
    signIn(@Body() authCredentialsDto:authCredentialsDto){
        return this.authService.signIn(authCredentialsDto)
    }
}
