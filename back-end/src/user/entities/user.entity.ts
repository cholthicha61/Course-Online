import { BaseEntity } from "src/entity/base.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Role, role => role.id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: Role;

  async hashPassword(password: string, saltOrRounds: number){
    return await bcrypt.hash(password, saltOrRounds);
  }
}
