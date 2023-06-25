import { Operation } from "src/enum/operation.enum";
import { Candle } from "src/interfaces/candle.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CandleDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @Column()
  open: number;

  @Column()
  close: number;

  @Column()
  high: number;

  @Column()
  low: number;

  @Column()
  volume: number;

  @Column()
  operation: Operation;

  constructor(candle?: Candle) {
    if (candle) {
      this.timestamp = candle.timestamp;
      this.open = candle.open;
      this.close = candle.close;
      this.high = candle.high;
      this.low = candle.low;
      this.volume = candle.volume;
      this.operation = candle?.operation || Operation.None;
    }
  }
}
