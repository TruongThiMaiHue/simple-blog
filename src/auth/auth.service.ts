import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity'
@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCrendentialsDto: AuthCrendentialsDto): Promise<void> {
        return await this.userRepository.signUp(authCrendentialsDto)
    }

    async signIn(authCrendentialsDto: AuthCrendentialsDto) {
        const username = await this.userRepository.validateUser(authCrendentialsDto)
        if (!username) {
            throw new UnauthorizedException('Username or password is incorrect')
        }
    }
}
