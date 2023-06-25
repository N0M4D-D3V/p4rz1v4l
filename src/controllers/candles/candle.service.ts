import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Candle } from "src/interfaces/candle.interface";
import { CandleDTO } from "./candle-dto.entity";

@Injectable()
export class CandleService {
  constructor(
    @InjectRepository(CandleDTO)
    private readonly repository: Repository<CandleDTO>
  ) {}

  public async getAll(): Promise<CandleDTO[]> {
    return this.repository.find();
  }

  public async create(candle: Candle): Promise<CandleDTO & Candle> {
    const value: CandleDTO = new CandleDTO(candle);
    return this.repository.save(value);
  }

  public async update(candle: Candle): Promise<Candle & CandleDTO> {
    return this.repository.save(candle);
  }

  public async delete(candle: Candle): Promise<DeleteResult> {
    return this.repository.delete(candle.id);
  }
}
