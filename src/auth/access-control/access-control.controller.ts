import { ParseArrayPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../../crud/crud.controller';
import { Crud } from '../../crud/crud.decorator';
import { AuthResource } from '../resource.decorator';
import { RolesGuard } from '../roles.guard';
import { AccessControlService } from './access-control.service';
import { FilterAccessControlDto } from './dto/filter-access-control.dto';

@ApiBearerAuth()
@AuthResource('access-control')
@UseGuards(RolesGuard)
@Crud('access-control', { crudService: AccessControlService, ParseArrayPipe })
export class AccessControlController extends CrudController<AccessControlService, FilterAccessControlDto>{
  constructor(readonly service: AccessControlService) {
    super(service)
  }
}
