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
              $ref: '#/definitions/CostumerOrderMatch'
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
            {
              type: 'order',
              customerName: 'Alex Abe',
              orderId: '1',
              date: '2023-07-11',
              product: 'Product A',
              price: 1.23
            },
            {
              type: 'order',
              customerName: 'Brian Ben',
              orderId: '2',
              date: '2023-08-08',
              product: 'Product B',
              price: 3.21
            }
          ]
        },
        transactions: {
          type: 'array',
          example: [
            {
              type: 'txn',
              customerName: 'Alex Abe',
              orderId: '1',
              date: '2023-07-11',
              product: 'Product A',
              price: 1.23,
              transactionType: 'paymentReceived',
              transactionDate: '2023-07-12',
              transactionAmount: 1.23
            },
            {
              type: 'txn',
              customerName: 'Alex Abe',
              orderId: '1',
              date: '2023-07-11',
              product: 'Product A',
              price: 1.23,
              transactionType: 'refundIssued',
              transactionDate: '2023-07-13',
              transactionAmount: -1.23
            },
            {
              type: 'txn',
              customerName: 'Brian Ben',
              orderId: '2',
              date: '2023-08-08',
              product: 'Product B',
              price: 3.21,
              transactionType: 'payment-1',
              transactionDate: '2023-08-11',
              transactionAmount: 1.21
            },
            {
              type: 'txn',
              customerName: 'Brian Ben',
              orderId: '2',
              date: '2023-08-08',
              product: 'Product B',
              price: 3.21,
              transactionType: 'payment-2',
              transactionDate: '2023-08-13',
              transactionAmount: 2.0
            }
          ]
        }
      }
    },
    CostumerOrderMatch: {
      type: 'object',
      properties: {
        customerName: {
          type: 'string',
          example: 'Matheus'
        },
        orders: {
          type: 'array',
          items: {
            $ref: '#/definitions/Orders'
          }
        }
      }
    },
    Orders: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        date: {
          type: 'string',
          example: '2025-01-15'
        },

        product: {
          type: 'object',
          example: {
            name: 'product-a',
            price: 15.0
          }
        },

        transactions: {
          $ref: '#/definitions/Transactions'
        }
      }
    },
    Transactions: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        orderId: {
          type: 'string'
        },
        date: {
          type: 'string',
          example: '2025-01-15'
        },
        type: {
          type: 'string',
          example: 'PAYMENT_RECEIVED, REFUND'
        },
        amount: {
          type: 'number',
          example: 1.35
        }
      }
    }
  }
};
