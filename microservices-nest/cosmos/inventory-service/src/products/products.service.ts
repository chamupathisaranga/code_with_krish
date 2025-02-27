import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto) {
    return await this.productRepository.save(product);
  }

async findOne(id: number) {
  if (!id || isNaN(id)) {
    throw new BadRequestException('Invalid product ID');
  }
  const product = await this.productRepository.findOne({ where: { id } });

  if (!product) {
    throw new BadRequestException('Product not found');
  }
  return { ...product, price: Number(product.price) };
}

 async findAll() {
    return this.productRepository.find().then((products) =>
      products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    );
  }
  async validateStock(id: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    return { available: product ? product.quantity >= quantity : false };
  }
}
