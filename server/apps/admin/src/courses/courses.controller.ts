import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) {}

  @Get('option')
  @ApiOperation({ summary: '获取列表option信息' })
  option() {
    return {
      title: '课程管理',
      column: [
        { prop: 'name', label: '课程名称', sortable: true },
        { prop: 'cover', label: '课程封面图' },
      ],
    }
  }
}
