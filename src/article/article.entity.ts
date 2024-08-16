import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date_public: Date;

    @Column()
    author: string;
}