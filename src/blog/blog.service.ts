import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
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

  async findOne(id: number) {
    const blog = await this.blogs.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const resp = await this.blogs.update(id, updateBlogDto);
    return { update_count: resp.affected };
  }

  async remove(id: number) {
    const resp = await this.blogs.delete(id);
    if (resp.affected === 0) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return { delete_count: resp.affected };
  }
}
