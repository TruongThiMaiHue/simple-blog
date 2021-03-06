import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../task.enum";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}
