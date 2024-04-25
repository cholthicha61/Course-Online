import { Order } from "src/order/entities/order.entity";
import { BaseEntity } from 'src/entity/base.entity';
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";

@Entity({name: 'course'})
export class Course extends BaseEntity{
    @Column()
    course_name: string;

    @Column()
    course_image: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    status: boolean;

    @Column()
    priority: number;

    @OneToMany(() => Order, order => order.course)
    orders: Order[];

}
