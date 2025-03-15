import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import {
  TransactionsRecordInput,
  OrderDTO,
  TransactionDTO
} from '../../src/application/domain/entities/dtos/transactions-record-Input.dto';

class TransactionsRecordInputFactoryType extends Factory<TransactionsRecordInput> {}
class OrderDTOFactoryType extends Factory<OrderDTO> {}
class TransactionDTOFactoryType extends Factory<TransactionDTO> {}

const OrderDTOFactoryTypeFactory = OrderDTOFactoryType.define(() => ({
  customer: faker.lorem.word(),
  date: faker.date.recent().toISOString().split('T')[0],
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  item: faker.lorem.word(),
  type: faker.lorem.word()
}));

const TransactionDTOFactory = TransactionDTOFactoryType.define(() => ({
  customer: faker.lorem.word(),
  date: faker.date.recent().toISOString().split('T')[0],
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  item: faker.lorem.word(),
  txnType: faker.lorem.word(),
  txnAmount: faker.number.float({ min: 0 }),
  match: {
    accuracy: '10%',
    orderId: faker.database.mongodbObjectId()
  }
}));

const TransactionsRecordInputFactory = TransactionsRecordInputFactoryType.define(() => ({
  orders: OrderDTOFactoryTypeFactory.buildList(5),
  transactions: TransactionDTOFactory.buildList(5)
}));

export { TransactionsRecordInputFactory, TransactionDTOFactory, OrderDTOFactoryTypeFactory };
