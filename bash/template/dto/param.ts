
import { OmitType, PartialType } from '@nestjs/swagger';
import { <className> } from '../entities/<fileName>.entity';

export class Param<className>Dto extends PartialType(
  OmitType(<className>, []),
) {}
