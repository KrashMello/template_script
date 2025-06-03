import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { <className>Service } from './<fileName>.service';
import { Create<className>Dto } from './dto/create-<fileName>.dto';
import { Update<className>Dto } from './dto/update-<fileName>.dto';

import { Response } from 'express';
import { Filter<className>Dto } from './dto/filter-<fileName>.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { <className> } from './entities/<fileName>.entity';
import { Param<className>Dto } from './dto/param-<fileName>.dto';

@ApiTags('')
@Controller(
  '',
)
export class <className>Controller {
  constructor(
    private readonly <className>Service: <className>Service,
  ) {}

  @ApiCreatedResponse({
    type: [<className>],
  })
  @Post()
  create(
    @Body() body: Create<className>Dto,
  ) {
    return this.<className>Service.create(
      body,
    );
  }

  @ApiOkResponse({
    type: [<className>],
  })
  @Post('search')
  async filter(@Body() filters: Filter<className>Dto) {
    return this.<className>Service.filter(filters);
  }

  @ApiOkResponse({
    description: 'archivo reporte-diario.xlsx como respuesta',
  })
  @Post('excel')
  async excel(
    @Body() filter: Filter<className>Dto,
    @Res() res: Response,
  ) {
    try {
      // Esperar a que la promesa se resuelva y obtener el buffer
      const buffer = await this.<className>Service.excel(filter);

      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=reporte-diario.xlsx`,
      });

      // Enviar el buffer como respuesta
      return res.end(buffer);
    } catch (error) {
      // Asegúrate de manejar el error adecuadamente
      console.error('Error generando el Excel', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  @ApiOkResponse({
    type: [<className>],
  })
  @Get()
  findAll() {
    return this.<className>Service.findAll();
  }

  @ApiOkResponse({
    type: [<className>],
  })
  @Get(':codigo')
  findOne(@Param() param: Param<className>Dto) {
    return this.<className>Service.findOne(param.codigo);
  }

  @ApiOkResponse({
    type: [<className>],
  })
  @Patch(':codigo')
  update(
    @Param() param: Param<className>Dto,
    @Body() body: Update<className>Dto,
  ) {
    return this.<className>Service.update(
      param.codigo,
      body,
    );
  }

  @ApiOkResponse({
    type: [<className>],
  })
  @Delete(':codigo')
  remove(@Param() param: Param<className>Dto) {
    return this.<className>Service.remove(param.codigo);
  }
}
