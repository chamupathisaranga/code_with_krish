import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id/validate')
  async validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return this.productService.validateStock(id, Number(quantity));
  }
}
