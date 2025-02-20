export type OrderRepositoryType = {
    createOrder: () => Promise<number>;
}

const createOrder = async () => {
    return 1;
}

export const OrderRepository: OrderRepositoryType = {
    createOrder,
  };