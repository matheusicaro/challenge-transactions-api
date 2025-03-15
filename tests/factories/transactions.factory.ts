import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import { Transaction } from '../../src/application/domain/entities/transaction.entity';

class TransactionFactoryType extends Factory<Transaction> {}

const TransactionFactory = TransactionFactoryType.define(() => ({
  customer: faker.lorem.word(),
  amount: faker.number.float({ min: 0 }),
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  item: faker.lorem.word(),
  date: faker.date.recent(),
  originalDate: faker.date.recent().toDateString(),
  type: faker.lorem.word()
}));

export { TransactionFactory };
