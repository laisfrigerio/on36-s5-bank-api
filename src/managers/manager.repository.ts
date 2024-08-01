import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';

@Injectable()
export class ManagerRepository {
  constructor(
    @InjectRepository(Manager)
    private readonly repository: Repository<Manager>,
  ) {}

  async findManagerById(managerId: string): Promise<Manager | null> {
    return await this.repository.findOne({
      where: { id: managerId },
    });
  }

  async createManager(manager: Manager): Promise<Manager> {
    return await this.repository.save(manager);
  }

  async removeManager(managerId: string): Promise<void> {
    await this.repository.delete(managerId);
  }
}
