import { BaseEntity } from 'src/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column()
  name: string;
  @Column()
  type: string;
}
