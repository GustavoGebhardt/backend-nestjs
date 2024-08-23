import { PrismaService } from "src/database/prisma.service";
import { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import { PasswordHashingService } from 'src/common/services/password-hashing.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(
        private readonly prisma: PrismaService,
        private passwordHashingService: PasswordHashingService,
    ) { }

    async create(email: string, username: string, password: string): Promise<Usuario> {
        const hashedPassword = await this.passwordHashingService.hashPassword(password);
        return await this.prisma.usuario.create({
            data: {
                id: randomUUID(),
                email,
                username,
                password: hashedPassword
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.prisma.usuario.findMany()
    }

    async findOne(id: string): Promise<Usuario> {
        return await this.prisma.usuario.findUnique({
            where: {
                id
            }
        })
    }

    async remove(id: string): Promise<Usuario> {
        return await this.prisma.usuario.delete({
            where: {
                id
            }
        })
    }

    async findOneByEmail(email: string): Promise<Usuario> {
        return await this.prisma.usuario.findUnique({
            where: {
                email
            }
        })
    }
}