import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.users.create(createUserDto);
    return this.users.save(user);
  }

  findAll() {
    return this.users.find();
  }

  async findOne(id: number) {
    const user = await this.users.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const resp = await this.users.update(id, updateUserDto);
    return { update_count: resp.affected };
  }

  async remove(id: number) {
    const resp = await this.users.delete(id);
    if (resp.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return { delete_count: resp.affected };
  }

  async findByEmail(email: string) {
    return this.users.findOneBy({ email });
  }
}
