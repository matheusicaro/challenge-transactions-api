import { Factory } from 'matheusicaro-node-framework';
import { faker } from '@faker-js/faker';

import { MatchTransactionDTO } from '../../src/application/domain/entities/dtos/match-transactions.dto';

class MatchTransactionDTOType extends Factory<MatchTransactionDTO> {}

const MatchTransactionDTOFactory = MatchTransactionDTOType.define(() => {
  const orderId = faker.database.mongodbObjectId();

  return {
    matches: [
      {
        order: {
          orderId,
          customer: faker.lorem.word(),
          date: faker.date.recent().toDateString(),
          price: faker.number.float({ min: 0 }),
          item: faker.lorem.word(),
          type: faker.lorem.word()
        },
        txns: [
          {
            orderId: faker.database.mongodbObjectId(),
            customer: faker.lorem.word(),
            date: faker.date.recent().toDateString(),
            price: faker.number.float({ min: 0 }),
            item: faker.lorem.word(),
            type: faker.lorem.word(),
            txnAmount: faker.number.float({ min: 0 }),
            transactionDate: faker.date.recent().toDateString(),
            txnType: faker.lorem.word(),

            match: {
              orderId,
              accuracy: `${faker.number.float({ min: 0, max: 100 })}%`
            }
          }
        ]
      }
    ],
    nonMatches: {
      orders: [],
      txns: []
    }
  };
});

export { MatchTransactionDTOFactory };
