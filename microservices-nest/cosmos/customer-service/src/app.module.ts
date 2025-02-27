import { Module } from '@nestjs/common';
import { CustomersService } from './customers/customers.service';
import { CustomersController } from './customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entity/customer.entity';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOSTNAME || 'localhost',
      port: 3306,
      username: 'root',
      password: 'chamu9667',
      database: 'cosmos',
      entities: [Customer],
      synchronize: true, // dont use this in production
    }),
  ],
})
export class AppModule {}
