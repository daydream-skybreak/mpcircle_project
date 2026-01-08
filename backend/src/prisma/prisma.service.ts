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
    console.log(`Connected as ${connectionString}`);
    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    console.log('Database URL:', process.env.DATABASE_URL);
    console.log('\n\n\n\n\n\nabove is the database url\n\n\n\n\n\n');
    super({ adapter });
  }

}
