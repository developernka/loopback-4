import {DefaultCrudRepository} from '@loopback/repository';
import {TestData} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TestDataRepository extends DefaultCrudRepository<
  TestData,
  typeof TestData.prototype.id
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(TestData, dataSource);
  }
}
