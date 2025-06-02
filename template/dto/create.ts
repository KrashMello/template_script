import { OmitType, PartialType } from '@nestjs/swagger';
import { <className> } from '../entities/<fileName>.entity';

export class Create<className>Dto extends PartialType(
  OmitType(<className>, []),
) {}
