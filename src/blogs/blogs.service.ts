import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogs: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    const blog = this.blogs.create(createBlogDto);
    return this.blogs.save(blog);
  }

  findAll() {
    return this.blogs.find();
  }

  findOne(id: number) {
    return this.blogs.findOne({ where: { id } });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogs.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogs.delete(id);
  }
}
