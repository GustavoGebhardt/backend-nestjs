import { Injectable } from '@nestjs/common';
import { PasswordHashingService } from 'src/common/services/password-hashing.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private passwordHashingService: PasswordHashingService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email)
        if (user) {
            const isPasswordValid = await this.passwordHashingService.comparePasswords(password, user.password)
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                }
            }
        }

        //Retornar erro
    }
}
