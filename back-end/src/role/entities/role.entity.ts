import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, user => user.roles)
    user: User;
}
