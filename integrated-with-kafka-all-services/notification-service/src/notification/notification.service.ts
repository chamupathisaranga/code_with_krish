import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });

  private readonly consumer = this.kafka.consumer({
    groupId: 'chamupathi.notification.service',
  });

  constructor() {}

  async onModuleInit() {
    console.log('Connecting Kafka Consumer...');
    await this.consumer.connect();
    console.log('Kafka Consumer Connected');
    this.consumeNotification();
  }

  async consumeNotification() {
    console.log("consumeNotification")
    await this.consumer.subscribe({
      topic: 'chamupathi.order.confirmed',
      fromBeginning: true, // Read messages from the beginning
    });

    console.log('Subscribed to chamupathi.order.confirmed');

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('Received message in NotificationService');
        const { msg } = JSON.parse(message.value.toString());
        console.log('****************', msg, '*******************');
      },
    });
  }
}
