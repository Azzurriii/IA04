import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with a demo user
    this.seedUsers();
  }

  private async seedUsers() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    this.users.push({
      id: this.nextId++,
      email: 'user@example.com',
      password: hashedPassword,
      name: 'Demo User',
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = {
      id: this.nextId++,
      email,
      password: hashedPassword,
      name,
    };
    this.users.push(user);
    return user;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string | null,
  ): Promise<void> {
    const user = await this.findById(userId);
    if (user) {
      user.refreshToken = refreshToken || undefined;
    }
  }

  async findByRefreshToken(refreshToken: string): Promise<User | undefined> {
    return this.users.find((user) => user.refreshToken === refreshToken);
  }
}
