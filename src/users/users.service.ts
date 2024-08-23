import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user-repository';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  create(createUserDto: CreateUserDto): Promise<Usuario> {
    const { email, username, password } = createUserDto;
    return this.userRepository.create(email, username, password);
  }

  findAll(): Promise<Usuario[]> {
    return this.userRepository.findAll();
  }

  findOne(id: string): Promise<Usuario> {
    return this.userRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string): Promise<Usuario> {
    return this.userRepository.remove(id)
  }

  findOneByEmail(email: string): Promise<Usuario> {
    return this.userRepository.findOneByEmail(email)
  }
}
