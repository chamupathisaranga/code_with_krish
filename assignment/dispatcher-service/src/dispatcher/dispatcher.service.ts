import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import { Vehicle } from './entity/vehicle';
import { Repository } from 'typeorm';

@Injectable()
export class DispatcherService {
  private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });

  private readonly consumer = this.kafka.consumer({
    groupId: 'chamupathi.notification.service',
  });

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async onModuleInit() {
    await this.consumer.connect();
    this.consumeDispatch();
  }

  async consumeDispatch() {
    console.log('consumeNotification');
    await this.consumer.subscribe({
      topic: 'chamupathi.order.confirmed',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Received consumeDispatch');
        const { vehicleNumber, city } = JSON.parse(message.value.toString());
        const saveobj = this.vehicleRepository.create({
          vehicleNumber,
          city,
        });
        this.vehicleRepository.save(saveobj);
      },
    });
  }
}
