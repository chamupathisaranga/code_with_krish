import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items } = createOrderDto;

    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });

    const saveOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemsRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: saveOrder,
      }),
    );
    await this.orderItemsRepository.save(orderItems);

    return this.orderRepository.findOne({
      where: { id: saveOrder.id },
      relations: ['items'],
    });
  }

  fetch(id: any) {
    return this.orderRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }

  fetchAll() {
    return this.orderRepository.find({
      relations: ['items'],
    });
  }

  async updateOrderStatus(id: number, updateOrderStatus: UpdateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id$${id} not found`);
    }

    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELED
    ) {
      throw new BadRequestException(
        `Order status can't be change when its delivered or cancelled`,
      );
    }

    order.status=updateOrderStatus.status;
    return this.orderRepository.save(order);

  }
}
