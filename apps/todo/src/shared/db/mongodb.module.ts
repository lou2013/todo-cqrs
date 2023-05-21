import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
// import { IdPlugin } from "./plugins/mongo-id.Plugin";
import * as paginatePlugin from 'mongoose-paginate-v2';
import { AppConfigs } from '../configs/app-configs';
import { MongoConfig } from '../configs/interfaces/mongo-config.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<MongoConfig>(AppConfigs.MONGO);
        const t: MongooseModuleFactoryOptions = {};
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
