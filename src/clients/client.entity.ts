import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { Manager } from '../managers/manager.entity';
import { IClient } from './client.interface';

@Entity('clients')
export class Client implements IClient {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => Account, (account) => account.client)
  accounts?: Account[];

  @ManyToOne(() => Manager, (manager) => manager.clients, { nullable: true })
  manager?: Manager;
}
