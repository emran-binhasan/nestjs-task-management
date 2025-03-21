import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { authCredentialsDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
    ) {}

    async signUp(authCredentialsDto: authCredentialsDto): Promise<void> {
        const { userName, password } = authCredentialsDto;
        
        const user = this.userRepository.create({
            userName,
            password,
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if(error.code = '23505'){
                throw new ConflictException('Username already exist')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }
}
