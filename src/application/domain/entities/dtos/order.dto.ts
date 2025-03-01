/**
 * Order DTO received from API inputs
 */
type OrderDTO = {
  orderId: string;
  customerName: string;
  date: string;
  price: number;
  product: string;
  type: 'order';
};

export { OrderDTO };
