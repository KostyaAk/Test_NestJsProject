import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity({ name: 'user' })
export class User {
    @PrimaryColumn()
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'varchar', default: UserRole.USER, name: 'userRole' })
    role: UserRole;

}