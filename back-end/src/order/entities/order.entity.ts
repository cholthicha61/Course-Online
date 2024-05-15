import { Course } from 'src/course/entities/course.entity';
import { BaseEntity } from 'src/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  startdate: string;

  @Column({ nullable: true })
  enddate: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
  course: Course;
}
