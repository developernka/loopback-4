import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { TestData } from '../models';
import { TestDataRepository } from '../repositories';

export class TestDataController {
  constructor(
    @repository(TestDataRepository)
    public testDataRepository: TestDataRepository,
  ) { }

  @post('/testdata', {
    responses: {
      '200': {
        description: 'TestData model instance',
        content: { 'application/json': { schema: { 'x-ts-type': TestData } } },
      },
    },
  })
  async create(@requestBody() testData: TestData): Promise<TestData> {
    delete testData.id;
    return await this.testDataRepository.create(testData);
  }

  @get('/testdata/count', {
    responses: {
      '200': {
        description: 'TestData model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TestData)) where?: Where,
  ): Promise<Count> {
    return await this.testDataRepository.count(where);
  }

  @get('/testdata', {
    responses: {
      '200': {
        description: 'Array of TestData model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': TestData } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TestData)) filter?: Filter,
  ): Promise<TestData[]> {
    return await this.testDataRepository.find(filter);
  }

  @patch('/testdata', {
    responses: {
      '200': {
        description: 'TestData PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() testData: TestData,
    @param.query.object('where', getWhereSchemaFor(TestData)) where?: Where,
  ): Promise<Count> {
    return await this.testDataRepository.updateAll(testData, where);
  }

  @get('/testdata/{id}', {
    responses: {
      '200': {
        description: 'TestData model instance',
        content: { 'application/json': { schema: { 'x-ts-type': TestData } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<TestData> {
    return await this.testDataRepository.findById(id);
  }

  @patch('/testdata/{id}', {
    responses: {
      '204': {
        description: 'TestData PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() testData: TestData,
  ): Promise<void> {
    await this.testDataRepository.updateById(id, testData);
  }

  @put('/testdata/{id}', {
    responses: {
      '204': {
        description: 'TestData PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() testData: TestData,
  ): Promise<void> {
    await this.testDataRepository.replaceById(id, testData);
  }

  @del('/testdata/{id}', {
    responses: {
      '204': {
        description: 'TestData DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.testDataRepository.deleteById(id);
  }
}
