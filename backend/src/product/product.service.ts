import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  findAll(category?: number): any {
    return this.prismaService.product.findMany({
      where: category ? { categoryId: category } : {},
    });
  }

  findOne(id: number){
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }
}
