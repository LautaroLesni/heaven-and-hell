import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(process.env.DATABASE_URL ?{
    type:"postgres",
    url:process.env.DATABASE_URL,
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true
  } : {
    type:"postgres",
    host:process.env.DATABASE_HOST,
    port:parseInt(process.env.DATABASE_PORT),
    username:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true
  })
  , UsersModule, ProductsModule, CategoriesModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

