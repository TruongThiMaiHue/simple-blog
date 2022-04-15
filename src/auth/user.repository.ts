import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common"
import { EntityRepository, Repository, Unique } from "typeorm"
import { AuthCrendentialsDto } from "./dto/auth-credentials.dto"
import { User } from "./user.entity"
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCrendentialsDto: AuthCrendentialsDto): Promise<void> {
        const salt = await bcrypt.genSalt()

        const { username, password } = authCrendentialsDto
        const user = new User()
        user.username = username
        user.password = await this.hashPassword(password, salt)
        try {
            await user.save()
        } catch (e) {
            if (e.code === 23505) {
                throw new ConflictException('Username already exist')
            } else {
                throw new InternalServerErrorException
            }
        }
    }
    private async hashPassword(pass: string, salt: string): Promise<string> {
        return await bcrypt.hash(pass, salt)
    }

    async validateUser(authCrendentialsDto: AuthCrendentialsDto): Promise<string> {
        const { username, password } = authCrendentialsDto
        const user = await this.findOne({ username })
        const validate = await bcrypt.compare(password, user.password)
    
        if (user && validate) {
            console.log(user.username)
            return user.username

        } else {
            console.log(null)

            return null
        }
    }

    
}

