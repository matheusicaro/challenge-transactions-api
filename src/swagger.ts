import { Spec } from 'swagger-schema-official';
import packageApi from '../package.json';
import { Environment } from './configuration/environment';

export const SwaggerDefinition: Spec = {
  swagger: '2.0',
  info: {
    version: packageApi.version,
    title: packageApi.name,
    description: packageApi.description,
    contact: {
      name: packageApi.author,
      email: 'contact@matheusicaro.com'
    }
  },
  basePath: Environment.API_BASE_PATH,
  schemes: ['http', 'https'],

  paths: {
    '/health': {
      get: {
        tags: ['health'],
        summary: 'check the Api status',
        description: '',
        operationId: 'getHealth',
        produces: ['application/json'],
        parameters: [],
        responses: {
          '200': {
            description: 'good response',
            examples: {
              status: 'ONLINE',
              schema: {
                $ref: '#/definitions/HealthStatusEntity'
              }
            }
          }
        }
      }
    },

    '/orders/transactions-record': {
      post: {
        tags: ['orders'],
        summary: 'Match transactions to orders for customer inputs',
        description:
          'Resource that matches transaction records to order records based on shared fields (customer name, order ID, date, and price).',
        operationId: 'matchCustomerOrdersTransactions',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'CostumerOrderMatch',
            schema: {
              $ref: '#/definitions/TransactionsRecordInput'
            }
          }
        ],

        responses: {
          '200': {
            description: 'Result of costumer order and transactions matches',
            schema: {
              $ref: '#/definitions/MatchTransactionDTO'
            }
          },
          '400': {
            description: 'When the body input is not valid',
            schema: {
              example: {
                message: 'The input is not valid'
              }
            }
          },
          '422': {
            description: 'When is not able to process the request due the body input received',
            schema: {
              example: {
                message: 'The transactions contains a wrong date and is not able to parse it'
              }
            }
          }
        }
      }
    }
  },

  definitions: {
    HealthStatusEntity: {
      type: 'object',
      properties: {
        time: {
          type: 'string',
          format: 'date-time',
          example: '2021-01-30T08:30:00Z'
        },
        status: {
          type: 'string',
          enum: ['ONLINE', 'FAILED']
        },
        message: {
          type: 'string'
        }
      }
    },
    TransactionsRecordInput: {
      type: 'object',
      properties: {
        orders: {
          type: 'array',
          example: [
            { customer: 'Alex Abel', orderId: '18G', date: '2023-07-11', item: 'Tool A', price: 1.23 },
            { customer: 'Brian Bell', orderId: '20S', date: '2023-08-08', item: 'Toy B', price: 3.21 }
          ]
        },
        transactions: {
          type: 'array',
          example: [
            {
              customer: 'Alexis Abe',
              orderId: '1B6',
              date: '2023-07-12',
              item: 'Tool A',
              price: 1.23,
              txnType: 'payment',
              txnAmount: 1.23
            },
            {
              customer: 'Alex Able',
              orderId: 'I8G',
              date: '2023-07-13',
              item: 'Tool A',
              price: 1.23,
              txnType: 'refund',
              txnAmount: -1.23
            },
            {
              customer: 'Brian Ball',
              orderId: 'ZOS',
              date: '2023-08-11',
              item: 'Toy B',
              price: 3.21,
              txnType: 'payment-1',
              txnAmount: 1.21
            },
            {
              customer: 'Bryan',
              orderId: '705',
              date: '2023-08-13',
              item: 'Toy B',
              price: 3.21,
              txnType: 'payment-2',
              txnAmount: 2.0
            }
          ]
        }
      }
    },
    MatchTransactionDTO: {
      type: 'object',
      properties: {
        matches: {
          type: 'array',
          description: 'list of orders with the matched transactions',
          items: {
            type: 'object',
            properties: {
              order: {
                $ref: '#/definitions/OrderDTO'
              },
              txns: {
                type: 'array',
                description: ' the transactions that matches to the order',
                items: {
                  $ref: '#/definitions/TransactionDTO'
                }
              }
            }
          }
        },
        nonMatches: {
          type: 'array',
          description: 'list of non matches orders and transactions',
          items: {
            type: 'object',

            properties: {
              orders: {
                type: 'array',
                description: 'list of orders with no matches for any transactions',
                items: {
                  $ref: '#/definitions/OrderDTO'
                }
              },
              txns: {
                type: 'array',
                description: 'list of transactions with no matches for any order',
                items: {
                  $ref: '#/definitions/TransactionDTO'
                }
              }
            }
          }
        }
      }
    },
    OrderDTO: {
      type: 'object',
      properties: {
        orderId: {
          type: 'string'
        },
        customer: {
          type: 'string'
        },
        item: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        price: {
          type: 'number'
        },
        date: {
          type: 'string',
          example: '2025-01-15'
        }
      }
    },
    TransactionDTO: {
      type: 'object',
      properties: {
        orderId: {
          type: 'string'
        },
        match: {
          type: 'object',
          properties: {
            orderId: {
              type: 'string'
            },
            accuracy: {
              type: 'string',
              example: '95%'
            }
          }
        },
        customer: {
          type: 'string'
        },
        date: {
          type: 'string',
          example: '2025-01-15'
        },
        item: {
          type: 'string'
        },
        price: {
          type: 'number'
        },
        transactionDate: {
          type: 'string',
          example: '2025-01-15'
        },
        txnType: {
          type: 'string'
        },
        txnAmount: {
          type: 'number',
          example: 1.35
        }
      }
    }
  }
};
