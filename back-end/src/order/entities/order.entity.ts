import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ default: true })
  status: boolean;

  @Column()
  startdate: string;

  @Column()
  enddate: string;

  @ManyToOne(() => User, user => user.orders)
  user: User[];
}
