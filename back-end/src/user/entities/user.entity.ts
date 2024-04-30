import { BaseEntity } from 'src/entity/base.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from "src/order/entities/order.entity";
import { Question } from "src/question/entities/question.entity";

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

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roles: Role;

  async hashPassword(password: string, saltOrRounds: number) {
    return await bcrypt.hash(password, saltOrRounds);
  }

  @OneToMany(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  orders: Order[];

  @OneToMany(() => Question, (question) => question.user)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  questions: Question[];
}
