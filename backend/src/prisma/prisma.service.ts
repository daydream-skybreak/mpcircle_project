import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import env from 'dotenv';

const environment = env.config();
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = environment.parsed?.DATABASE_URL;
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

}
