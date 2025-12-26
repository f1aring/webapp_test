import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // Check if user already exists
    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = this.userRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);

    // Generate JWT token
    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    // Return user without password
    const { password, ...userWithoutPassword } = savedUser;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  async login(dto: LoginDto) {
    // Find user by email
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || !user.isActive) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}

