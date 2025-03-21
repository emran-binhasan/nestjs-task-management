import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Register the User entity
  providers: [AuthService],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}
