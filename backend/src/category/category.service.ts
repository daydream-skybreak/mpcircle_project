import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  findAll(): any {
    return this.prismaService.category.findMany();
  }

  findOne(id: number): any {
    return this.prismaService.category.findUnique({
      where: { id: typeof id === 'string' ? Number.parseInt(id) : id },
    });
  }
}
