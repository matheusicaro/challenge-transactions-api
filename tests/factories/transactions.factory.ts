import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import { Transaction, TransactionType } from '../../src/application/domain/entities/transaction.entity';

class TransactionFactoryType extends Factory<Transaction> {}

const TransactionFactory = TransactionFactoryType.define(() => ({
  customerName: faker.lorem.word(),
  amount: faker.number.float({ min: 0 }),
  orderId: faker.database.mongodbObjectId(),
  price: faker.number.float({ min: 0 }),
  product: faker.lorem.word(),
  date: faker.date.recent(),
  type: faker.helpers.enumValue(TransactionType)
}));

export { TransactionFactory };
