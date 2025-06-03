
import { Module } from '@nestjs/common';
import { <className>Service } from './<fileName>.service';
import { <className>Controller } from './<fileName>.controller';
import { ExcelService } from 'src/utils/excel';

@Module({
  controllers: [<className>Controller],
  providers: [<className>Service, ExcelService],
})
export class <className>Module {}
