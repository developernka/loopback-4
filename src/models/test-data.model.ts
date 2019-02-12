import { Entity, model, property } from '@loopback/repository';

@model({ settings: { "strict": false } })
export class TestData extends Entity {
  @property({
    type: 'object',
    required: true,
    default: {},
  })
  data: object;

  @property({
    type: 'string',
    id: true,
  })
  id: string;

  // @property({
  //   type: 'string',
  //   required: true,
  // })
  // jobId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<TestData>) {
    super(data);
  }
}
