import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import { Order } from '../../src/application/domain/entities/order.entity';
import { TransactionFactory } from './transactions.factory';

class OrderFactoryType extends Factory<Order> {}

const OrderFactory = OrderFactoryType.define(() => {
  const customerName = faker.lorem.word();

  return {
    customerName: faker.lorem.word(),
    type: faker.lorem.word(),
    amount: faker.number.float({ min: 0 }),
    orderId: faker.database.mongodbObjectId(),
    price: faker.number.float({ min: 0 }),
    id: faker.database.mongodbObjectId(),
    date: faker.date.recent(),
    transactions: TransactionFactory.buildList(5, { customerName }),
    product: {
      name: faker.lorem.word(),
      price: faker.number.float({ min: 0 })
    }
  };
});

export { OrderFactory };
