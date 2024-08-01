import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from '../clients/client.entity';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @OneToMany(() => Client, (client) => client.manager)
  clients: Client[];
}
