import { BaseEntity } from "src/entity/base.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
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

    @Column()
    active: boolean;

}
