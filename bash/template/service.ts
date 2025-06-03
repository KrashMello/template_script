import { BadRequestException, Injectable } from '@nestjs/common';
import { Create<className>Dto } from './dto/create-<fileName>.dto';
import { Update<className>Dto } from './dto/update-<fileName>.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ExcelService } from 'src/utils/excel';
import { Filter<className>Dto } from './dto/filter-<fileName>.dto';
import { incrementNumber } from 'src/utils/IncrementNumber';

@Injectable()
export class <className>Service {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private generateExcel: ExcelService,
  ) {}

  async lastCod() {
    try {
      const query = ``;
      const data = await this.entityManager.query(query);
      return data[0].codigo;
    } catch (error) {
      throw error;
    }
  }

  async create(body: Create<className>Dto) {
    try {
      const { } = body;
      // const lastCod = await this.lastCod();
      // const codigo = incrementNumber(lastCod, 1);
      const data = await this.filter({
      });
      if (data && data.length > 0)
        throw new BadRequestException('El nombre ya existe.');
      const query = `
      `;
      await this.entityManager.query(query, []);
      return await this.findOne();
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const query = ``;
      const data = await this.entityManager.query(query);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(codigo: string) {
    try {
      const query = ``;
      const data = await this.entityManager.query(query, [codigo]);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(
    codigo: string,
    body: Update<className>Dto,
  ) {
    try {
      const { } = body;
      const data = await this.findOne(codigo);
      if (data.length === 0)
        throw new BadRequestException('No existe este dato.');

      const query = `
              `;
      await this.entityManager.query(query, [codigo]);
      return await this.findOne(codigo);
    } catch (error) {
      throw error;
    }
  }

  async remove(codigo: string) {
    try {
      const data = await this.findOne(codigo);
      if (data.length === 0)
        throw new BadRequestException('No existe este dato.');
      const query = `
              `;
      await this.entityManager.query(query, [
        codigo,
        data[0].uniacpestregcod === '1' ? '0' : '1',
      ]);
      return await this.findOne(codigo);
    } catch (error) {
      throw error;
    }
  }

  async filter(filters: Filter<className>Dto): Promise<any> {
    try {
      // Construcción inicial de la consulta
      let query = `
      select 
      uniacpcod, 
      uniacpdes,
      uniacpdescor,
      uniacpestregcod
      from 
      cbuap10
      `;

      // Variables para almacenar los parámetros de consulta y condiciones
      const params = [];
      const conditions = [];

      // Agregar condiciones basadas en los filtros proporcionados
      if (filters.codigo) {
        conditions.push(`codigo::TEXT ILIKE $${params.length + 1}`);
        params.push(`%${filters.codigo}%`);
      }
      if (filters.description) {
        conditions.push(`description ILIKE $${params.length + 1}`);
        params.push(`%${filters.description}%`);
      }

      // Añadir condiciones a la consulta si existen
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      // Añadir ordenación
      query += ` ORDER BY codigo`;

      // Ejecutar la consulta con los parámetros
      return await this.entityManager.query(query, params);
    } catch (error) {
      console.error(error); // Imprimir el error completo en la consola
      throw new BadRequestException(
        error.message || 'Error executing filter query.',
      );
    }
  }

  async filterAlias(filters: Filter<className>Dto): Promise<any> {
    try {
      // Construcción inicial de la consulta
      let query = `
      select 
      uniacpcod as "codigo", 
      uniacpdes as "descripcion",
      uniacpdescor as "descripcionCorta",
      uniacpestregcod as "estadoRegistro"
      from 
      cbuap10
      `;

      // Variables para almacenar los parámetros de consulta y condiciones
      const params = [];
      const conditions = [];

      // Agregar condiciones basadas en los filtros proporcionados
      if (filters.codigo) {
        conditions.push(`codigo::TEXT ILIKE $${params.length + 1}`);
        params.push(`%${filters.codigo}%`);
      }
      if (filters.description) {
        conditions.push(`description ILIKE $${params.length + 1}`);
        params.push(`%${filters.description}%`);
      }

      // Añadir condiciones a la consulta si existen
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      // Añadir ordenación
      query += ` ORDER BY codigo`;

      // Ejecutar la consulta con los parámetros
      return await this.entityManager.query(query, params);
    } catch (error) {
      console.error(error); // Imprimir el error completo en la consola
      throw new BadRequestException(
        error.message || 'Error executing filter query.',
      );
    }
  }

  async excel(filter: Filter<className>Dto) {
    try {
      const data = await this.filterAlias(filter);

      return await this.generateExcel.generate(data, 'PRESTACION');
    } catch (error) {
      throw new Error(`Error en: ${error.message}`);
    }
  }
}
