import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '@app/common/common.module';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    CommonModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
