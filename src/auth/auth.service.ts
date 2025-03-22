import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from './user.entity';
  import { authCredentialsDto } from './dto/create-user.dto';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async signUp(authCredentialsDto: authCredentialsDto): Promise<void> {
      const { userName, password } = authCredentialsDto;
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('salt', salt);
      console.log('hashedpass ', hashedPassword);
  
      const user = this.userRepository.create({
        userName,
        password: hashedPassword,
      });
  
      try {
        await this.userRepository.save(user);
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  
    async signIn(authCredentialsDto: authCredentialsDto): Promise<string> {
      const { userName, password } = authCredentialsDto;
      const user = await this.userRepository.findOne({ where: { userName } });
  
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return 'success';
      } else {
        throw new UnauthorizedException('Please check your credentials again');
      }
    }
  }
  