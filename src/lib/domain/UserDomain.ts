import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserData } from 'UserData';
import { Not } from 'typeorm';
import Env from '../../config/Env';
import UserEntity from '../entity/UserEntity';
import Unauthorized from '../../types/exception/Unauthorized';
import NotFoundException from '../../types/exception/NotFoundException';
import DuplicatedException from '../../types/exception/DuplicatedException';

export default class UserDomain {
  private constructor() { }

  static instance() {
    return new UserDomain();
  }

  async login(username: string, password: string) {
    const user = await UserEntity.findOne({ username });

    if (!user) {
      throw new Unauthorized();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Unauthorized();
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      Env.SECRET_JWT,
      {
        expiresIn: 3600,
      },
    );

    const result: any = user;
    delete result.password;
    return {
      user: result,
      token,
    };
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(userData: UserData) {
    const duplicatedUsers = await UserEntity.find({
      where: [{ username: userData.username }, { email: userData.email }],
    });

    if (duplicatedUsers.length) {
      throw new DuplicatedException('Duplicated username/email');
    }

    const newUser = new UserEntity();
    newUser.email = userData.email!;
    newUser.username = userData.username!;
    newUser.password = await this.hashPassword(userData.password!);

    const result: any = await newUser.save();
    delete result.password;

    return result;
  }

  getAllUsers() {
    return UserEntity.find({ select: ['id', 'username', 'email'] });
  }

  getUser(id: number) {
    return UserEntity.findOne({
      where: { id },
      select: ['id', 'username', 'email'],
    });
  }

  async update(id: number, userData: UserData) {
    const user = await UserEntity.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const duplicatedUsers = await UserEntity.find({
      where: [
        { username: userData.username, id: Not(id) },
        { email: userData.email, id: Not(id) },
      ],
    });

    if (duplicatedUsers.length) {
      throw new DuplicatedException('Duplicated username/email');
    }

    if (userData.email) {
      user.email = userData.email;
    }

    if (userData.username) {
      user.username = userData.username;
    }

    if (userData.password) {
      user.password = await this.hashPassword(userData.password!);
    }

    return user.save();
  }

  delete(id: number) {
    return UserEntity.delete({ id });
  }
}
