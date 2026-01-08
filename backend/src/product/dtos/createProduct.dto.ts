// model Product {
//   id          Int       @id @default(autoincrement())
//   name        String
//   description String?
//     imageUrl    String?
//       price       Float
//   inventory   Int
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   Category    Category? @relation(fields: [categoryId], references: [id])
//   categoryId  Int?
//     Category    Category? @relation(fields: [categoryId], references: [id])
// }
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber()
  price: number;
  @IsString()
  imageUrl: string;
  @IsNumber()
  inventory: number;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
