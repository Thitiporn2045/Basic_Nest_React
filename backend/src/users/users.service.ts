import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        const count = await this.usersRepository.count();
        if (count === 0) {
            console.log('No users found. Creating default users...');
            await this.usersRepository.save([
                {name: 'THITIPORN THIAMJAN'}
            ]);
        }
        return this.usersRepository.find();
    }
}
