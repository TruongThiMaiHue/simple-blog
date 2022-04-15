import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCrendentialsDto: AuthCrendentialsDto): Promise<void> {
        return this.authService.signUp(authCrendentialsDto)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCrendentialsDto: AuthCrendentialsDto) {
        return this.authService.signIn(authCrendentialsDto)
    }
}
