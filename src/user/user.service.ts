import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CommonService } from '../common/common.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      delete user.updatedAt;
      delete user.createdAt;

      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: {
          id: true,
          password: true,
          firstName: true,
          lastName: true,
          email: true,
          status: true,
        },
      });

      if (!user) throw new UnauthorizedException(`Invalid credentials`);
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(`Invalid credentials`);
      delete user.password;
      return { user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async checkStatus(user: User) {
    delete user.createdAt;
    delete user.updatedAt;
    return { user, token: this.getJwtToken({ id: user.id }) };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
