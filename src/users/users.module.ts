import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './repositories/user-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-user-repository';
import { PasswordHashingService } from 'src/common/services/password-hashing.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    PasswordHashingService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UsersService]
})
export class UsersModule { }
