import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  @ApiOperation({ summary: '获取列表option信息' })
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id,
    }));

    return {
      title: '课时管理',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属课程',
          type: 'select',
          dicData: courses,
          row: true,
        },
        { prop: 'name', label: '课时名称', span: 24 },
        {
          prop: 'file',
          label: '视频文件',
          width: 120,
          type: 'upload',
          listType: 'picture-img',
          action: '/upload',
          span: 24,
        },
      ],
    };
  }
}
