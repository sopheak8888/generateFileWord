import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { TestService } from './test.service';

@Controller('api/test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Get()
  async generateWordFile(@Res() res: Response) {
    return this.service.generateWordFile(res);
  }
}
