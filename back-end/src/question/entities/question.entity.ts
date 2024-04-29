import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'question' })
export class Question extends BaseEntity {
  @Column()
  message: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
