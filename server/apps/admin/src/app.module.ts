import { CommonModule } from './../../../libs/common/src/common.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
// import { DbModule } from '@libs/db';

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION,
              accessKeyId: process.env.OSS_ACCESS_KEY_ID,
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET,
            },
          }),
        }
      }
    }),
    // MulterModule.register({
    //   storage: MAO({
    //     config: {
    //       region: '<region>',
    //       accessKeyId: '<accessKeyId>',
    //       accessKeySecret: '<accessKeySecret>',
    //       bucket: '<bucket>',
    //     },
    //   }),
    //   // dest: 'uploads'
    // }),
    // DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
