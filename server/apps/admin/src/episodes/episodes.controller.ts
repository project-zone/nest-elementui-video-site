import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(@InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>) {}
}
