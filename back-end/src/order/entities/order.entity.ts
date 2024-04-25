import { Course } from 'src/course/entities/course.entity';
import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ default: true })
  status: boolean;

  @Column()
  startdate: string;

  @Column()
  enddate: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: User[];

  @ManyToOne(() => Course, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;
}
