import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // Регистрация пользователя по имейлу и паролю
    @Post('/register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.createUser(registerDto);
    }

    // Вход пользователя по имейлу и паролю
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('/refresh-token')
    async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
        return await this.authService.refreshTokens(refreshToken);
    }
}