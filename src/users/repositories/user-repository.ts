import { Usuario } from "@prisma/client";

export abstract class UserRepository {
    abstract create(email: string, username: string, password: string): Promise<Usuario>;
    abstract findAll(): Promise<Usuario[]>;
    abstract findOne(id: string): Promise<Usuario>;
    abstract remove(id: string): Promise<Usuario>;
    abstract findOneByEmail(email: string): Promise<Usuario>;
}