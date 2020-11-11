import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiQuery, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthActions } from "../auth/action.decorator";
import { CREATE_DTO, CREATE_RESPONSE, DELETE_BY_ID_RESPONSE, DELETE_MANY_RESPONSE, FIND_BY_ID_RESPONSE, FIND_MANY_FILTER, FIND_MANY_RESPONSE, FIND_MANY_SELECT_ENUM, UPDATE_DTO, UPDATE_MANY_FILTER, UPDATE_MANY_RESPONSE, UPDATE_ONE_RESPONSE } from "../constants";


export function Crud(prefix: string, { crudService, ParseArrayPipe }: {
  crudService: any;
  ParseArrayPipe: any;
}): ClassDecorator {
  return (crudController) => {

    Controller(prefix)(crudController);
    ApiTags(prefix)(crudController);

    const proto = crudController.prototype;

    const createDto = Reflect.getMetadata(CREATE_DTO, crudService);
    const createResponse = Reflect.getMetadata(CREATE_RESPONSE, crudService);
    const findByIdResponse = Reflect.getMetadata(FIND_BY_ID_RESPONSE, crudService);
    const findManyFilter = Reflect.getMetadata(FIND_MANY_FILTER, crudService);
    const findManySelectEnum = Reflect.getMetadata(FIND_MANY_SELECT_ENUM, crudService);
    const findManyResponse = Reflect.getMetadata(FIND_MANY_RESPONSE, crudService);
    const updateDto = Reflect.getMetadata(UPDATE_DTO, crudService);
    const updateOneResponse = Reflect.getMetadata(UPDATE_ONE_RESPONSE, crudService);
    const updateManyFilter = Reflect.getMetadata(UPDATE_MANY_FILTER, crudService);
    const updateManyResponse = Reflect.getMetadata(UPDATE_MANY_RESPONSE, crudService);
    const deleteByIdResponse = Reflect.getMetadata(DELETE_BY_ID_RESPONSE, crudService);
    const deleteManyResponse = Reflect.getMetadata(DELETE_MANY_RESPONSE, crudService);

    const applyDecorators = {
      createMany() {
        const createMany = Reflect.getOwnPropertyDescriptor(proto, 'createMany');
        ApiBody({ type: [createDto] })(proto, 'createMany', createMany);
        ApiOkResponse({ type: [createResponse] })(proto, 'createMany', createMany);
        Post()(proto, 'createMany', createMany);
        AuthActions('CreateMany')(proto, 'createMany', createMany);
        Body(new ParseArrayPipe({ items: createDto }))(proto, 'createMany', 0);
        Reflect.defineMetadata('design:paramtypes', [Array], proto, "createMany");
      },
      findById() {
        const findById = Reflect.getOwnPropertyDescriptor(proto, 'findById');
        ApiOkResponse({ type: findByIdResponse })(proto, 'findById', findById);
        Get(':id')(proto, 'findById', findById);
        AuthActions('ReadOne', 'ReadMany')(proto, 'findById', findById);
        Param('id')(proto, 'findById', 0);
        Reflect.defineMetadata('design:paramtypes', [String], proto, "findById");
      },
      findMany() {
        const findMany = Reflect.getOwnPropertyDescriptor(proto, 'findMany');
        ApiQuery({ name: "filter", type: findManyFilter, required: false })(proto, 'findMany', findMany);
        ApiQuery({ name: "limit", type: Number, required: false })(proto, 'findMany', findMany);
        ApiQuery({ name: "sort", type: [String], required: false })(proto, 'findMany', findMany);
        ApiQuery({ name: "skip", type: Number, required: false })(proto, 'findMany', findMany);
        ApiQuery({ name: "select", type: String, required: false, isArray: true, enum: findManySelectEnum })(proto, 'findMany', findMany);
        ApiOkResponse({ type: findManyResponse })(proto, 'findMany', findMany);
        Get()(proto, 'findMany', findMany);
        AuthActions('ReadMany')(proto, 'findMany', findMany);
        Query('filter')(proto, 'findMany', 0);
        Query('limit')(proto, 'findMany', 1);
        Query('skip')(proto, 'findMany', 2);
        Query('sort')(proto, 'findMany', 3);
        Query('select')(proto, 'findMany', 4);
        Reflect.defineMetadata('design:paramtypes', [findManyFilter, Number, Number, Array, Array], proto, "findMany");
      },
      updateOne() {
        const updateOne = Reflect.getOwnPropertyDescriptor(proto, 'updateOne');
        ApiBody({ type: updateDto })(proto, 'updateOne', updateOne);
        ApiOkResponse({ type: updateOneResponse })(proto, 'updateOne', updateOne);
        Put(':id')(proto, 'updateOne', updateOne);
        AuthActions('UpdateOne', 'UpdateMany')(proto, 'updateOne', updateOne);
        Param('id')(proto, 'updateOne', 0);
        Body()(proto, 'updateOne', 1);
        Reflect.defineMetadata('design:paramtypes', [String, updateDto], proto, "updateOne");
      },
      updateMany() {
        const updateMany = Reflect.getOwnPropertyDescriptor(proto, 'updateMany');
        ApiQuery({ name: 'filter', type: updateManyFilter })(proto, 'updateMany', updateMany);
        ApiBody({ type: updateDto })(proto, 'updateMany', updateMany);
        ApiOkResponse({ type: updateManyResponse })(proto, 'updateMany', updateMany);
        Put()(proto, 'updateMany', updateMany);
        AuthActions('UpdateMany')(crudController, 'updateMany', updateMany);
        Query('filter')(proto, 'updateMany', 0);
        Body()(proto, 'updateMany', 1);
        Reflect.defineMetadata('design:paramtypes', [updateManyFilter, updateDto], proto, "updateMany");
      },
      deleteById() {
        const deleteById = Reflect.getOwnPropertyDescriptor(proto, 'deleteById');
        ApiOkResponse({ type: deleteByIdResponse })(proto, 'deleteById', deleteById);
        Delete(':id')(proto, 'deleteById', deleteById);
        AuthActions('DeleteOne', 'DeleteMany')(proto, 'deleteById', deleteById);
        Param('id')(proto, 'deleteById', 0);
        Reflect.defineMetadata('design:paramtypes', [String], proto, "deleteById");
      },
      deleteMany() {
        const deleteMany = Reflect.getOwnPropertyDescriptor(proto, 'deleteMany');
        ApiOkResponse({ type: deleteManyResponse })(proto, 'deleteMany', deleteMany);
        Delete()(proto, 'deleteMany', deleteMany);
        AuthActions('DeleteMany')(proto, 'deleteMany', deleteMany);
        Body(new ParseArrayPipe({ items: String }))(proto, 'deleteMany', 0);
        Reflect.defineMetadata('design:paramtypes', [Array], proto, "deleteMany");
      }
    };

    const crudOperators = ['createMany', 'findById', 'findMany', 'updateOne', 'updateMany', 'deleteById', 'deleteMany'];
    crudOperators.forEach(operator => {
      if (!proto.hasOwnProperty(operator)) {
        const protoFunc = proto[operator];
        proto[operator] = {
          [operator]: function (...args: any[]) {
            return protoFunc.bind(this)(...args);
          }
        }[operator];
        applyDecorators[operator]?.();
      }
    });
  };
}
