import { IsEnum } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRM = 'CONFIRM',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export class UpdateOrderStatus {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
