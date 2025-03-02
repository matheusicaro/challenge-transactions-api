import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import {
  TransactionsRecordInput,
  OrderDTO,
  TransactionsDTO
} from '../../src/application/domain/entities/dtos/transactions-record-Input.dto';

class TransactionsRecordInputFactoryType extends Factory<TransactionsRecordInput> {}
class OrderDTOFactoryType extends Factory<OrderDTO> {}
class TransactionsDTOFactoryType extends Factory<TransactionsDTO> {}

const OrderDTOFactoryTypeFactory = OrderDTOFactoryType.define(() => ({
  customerName: faker.lorem.word(),
  date: faker.date.recent().toISOString().split('T')[0],
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  product: faker.lorem.word(),
  type: faker.lorem.word()
}));

const TransactionsDTOFactory = TransactionsDTOFactoryType.define(() => ({
  customerName: faker.lorem.word(),
  date: faker.date.recent().toISOString().split('T')[0],
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  product: faker.lorem.word(),
  type: faker.lorem.word(),
  transactionAmount: faker.number.float({ min: 0 }),
  transactionDate: faker.date.recent().toISOString().split('T')[0],
  transactionType: faker.lorem.word()
}));

const TransactionsRecordInputFactory = TransactionsRecordInputFactoryType.define(() => ({
  orders: OrderDTOFactoryTypeFactory.buildList(5),
  transactions: TransactionsDTOFactory.buildList(5)
}));

export { TransactionsRecordInputFactory, TransactionsDTOFactory, OrderDTOFactoryTypeFactory };
