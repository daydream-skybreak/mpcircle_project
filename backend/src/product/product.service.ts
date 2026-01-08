import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  findAll(category?: number): any {
    return this.prismaService.product.findMany({
      where: category
        ? typeof category === 'string'
          ? { categoryId: Number.parseInt(category) }
          : { categoryId: category }
        : {},
    });
  }

  findOne(id){
    return this.prismaService.product.findUnique({
      where: { id: typeof id === 'string'? Number.parseInt(id): id },
    });
  }
}
