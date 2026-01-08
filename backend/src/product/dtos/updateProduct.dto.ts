import { CreateProductDto } from './createProduct.dto';
import { PartialType } from '@nestjs/mapped-types';
class UpdateProductDto extends PartialType(CreateProductDto){}