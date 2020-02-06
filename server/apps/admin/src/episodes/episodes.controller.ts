import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
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
  ) {}

  @Get('option')
  @ApiOperation({ summary: '获取列表option信息' })
  option() {
    return {
      title: '课时管理',
      column: [{ prop: 'name', label: '课时名称' }],
    };
  }
}
