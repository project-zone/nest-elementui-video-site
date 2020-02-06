import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Crud({
  model: User,
})
@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}

  @Get('option')
  @ApiOperation({ summary: '获取列表option信息' })
  option() {
    return {
      title: '用户管理',
      column: [
        { prop: 'username', label: '用户名' },
      ],
    }
  }
}
