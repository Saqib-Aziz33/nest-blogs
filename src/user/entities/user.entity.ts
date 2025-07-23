import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Blog } from '../../blog/entities/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
