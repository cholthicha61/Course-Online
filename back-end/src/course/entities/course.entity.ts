import { Order } from "src/order/entities/order.entity";
import { BaseEntity } from 'src/entity/base.entity';
import { Image } from "src/image/entities/image.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "src/category/entities/category.entity";

@Entity({ name: 'course' })
export class Course extends BaseEntity {
    @Column({ name: 'course_name' })
    courseName: string;

    @Column({ name: 'course_image' ,nullable: true})
    courseImage: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ default: true })
    status: boolean;

    @Column()
    priority: number;

    @OneToMany(() => Order, order => order.course)
    orders: Order[];

    @OneToMany(() => Image, image => image.course)
    images: Image[];
    @ManyToOne(() => Category,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'category_id', referencedColumnName:'id'})
    categorys: Category;

}
