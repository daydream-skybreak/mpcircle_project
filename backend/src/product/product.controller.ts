import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  getAllProducts(@Query('category') category?: number): any {
    return this.productService.findAll(category);
  }

  @Get(':id')
  getProductById(@Param('id') id: number): any {
    if (isNaN(id)) {
      throw new NotFoundException(`id must be a number`);
    }
    return this.productService.findOne(id);
  }
}
