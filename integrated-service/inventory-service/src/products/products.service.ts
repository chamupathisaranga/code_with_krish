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

  async create(productDto: CreateProductDto) {
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }

  async getProductById(id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid product ID');
    }
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException(`Product with id ${id}not found`);
    }
    return { ...product, price: Number(product.price) };
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async updateStock(id: number, quantity: number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      product.quantity -= quantity;
      await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(
        `Error updating stock for Product ID ${id}: ${error.message}`,
      );
    }
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    const product = await this.productRepository.findOne({ where: { id } });
    return { available: product ? product.quantity >= quantity : false };
  }
}
