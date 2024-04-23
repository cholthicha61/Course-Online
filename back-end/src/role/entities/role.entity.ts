import { BaseEntity } from 'src/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column()
  role_name: string;
}
