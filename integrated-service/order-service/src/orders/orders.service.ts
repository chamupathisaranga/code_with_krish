import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  private readonly customerServiceUrl = 'http://localhost:3002/customers';
  private readonly inventoryServiceUrl = 'http://localhost:3001/products';
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customerId, items } = createOrderDto;
    let cusData;
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.customerServiceUrl}/${customerId}`),
      );
      console.log('Customer data:', response.data);
      cusData = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException({ message: 'Customer not found' });
      }
      throw new InternalServerErrorException(
        error.response?.data?.message || 'Failed to fetch customer',
      );
    }

    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });

    for (const product of items) {
      try {
        const response = await lastValueFrom(
          this.httpService.get(
            `${this.inventoryServiceUrl}/${product.productId}/validate?quantity=${product.quantity}`,
          ),
        );

        if (!response.data.available) {
          throw new BadRequestException({
            message: `Product ID ${product.productId} is out of stock.`,
          });
        }
      } catch (error) {
        throw new BadRequestException({
          message: `Error checking stock for Product ID ${product.productId}: ${error.response?.data?.message || error.message}`,
        });
      }
    }

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemsRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: savedOrder,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    await this.orderRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items'],
    });

    for (const product of items) {
      try {
        await lastValueFrom(
          this.httpService.patch(
            `${this.inventoryServiceUrl}/${product.productId}/reduce?quantity=${product.quantity}`,
          ),
        );
      } catch (error) {
        throw new BadRequestException({
          message: `Error checking stock for Product ID ${product.productId}: ${error.response?.data?.message || error.message}`,
        });
      }
    }
    const data = {
      customerDetails: cusData,
      order:savedOrder,
      orderItems: [...orderItems.map((order) => order.order)],
    };

    return data;
  }

  fetch(id: any) {
    return this.orderRepository.findOne({
      where: { id: id},
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

    order.status = updateOrderStatus.status;
    return this.orderRepository.save(order);
  }
}
