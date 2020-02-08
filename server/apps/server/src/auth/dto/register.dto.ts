import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ title: '用户名', example: 'username' })
  username: string;
  @ApiProperty({ title: '密码', example: 'password' })
  password: string;
}
