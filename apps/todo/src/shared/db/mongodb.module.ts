import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { IdPlugin } from "./plugins/mongo-id.Plugin";
import * as paginatePlugin from 'mongoose-paginate-v2';
import { AppConfigs } from '../configs/app-configs';
import { MongoConfig } from '../configs/interfaces/mongo-config.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<MongoConfig>(AppConfigs.MONGO);
        return {
          uri: config.url,
          autoIndex: true,
          // useCreateIndex: true,
          connectionFactory: (connection) => {
            connection.plugin(paginatePlugin);
            return connection;
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class MongooseLoaderModule {}
