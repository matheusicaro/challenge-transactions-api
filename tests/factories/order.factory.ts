import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import { Order } from '../../src/application/domain/entities/order.entity';
import { TransactionFactory } from './transactions.factory';

class OrderFactoryType extends Factory<Order> {}

const OrderFactory = OrderFactoryType.define(() => {
  const customer = faker.lorem.word();

  return {
    id: faker.database.mongodbObjectId(),
    type: faker.lorem.word(),
    customer: faker.lorem.word(),
    date: faker.date.past(),
    originalDate: faker.date.recent().toDateString(),
    transactions: TransactionFactory.buildList(5, { customer }),
    item: {
      name: faker.lorem.word(),
      price: faker.number.float({ min: 0 })
    }
  };
});

export { OrderFactory };
