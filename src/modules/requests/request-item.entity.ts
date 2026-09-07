import { Column, Entity, ManyToOne } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { numericTransformer } from "../../common/transformers/numeric.transformer";
import { ErpRequest } from "./request.entity";

@Entity({ name: "request_items" })
export class RequestItem extends AppBaseEntity {
  @Column({ type: "varchar", length: 160 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column("numeric", {
    name: "unit_price",
    precision: 14,
    scale: 2,
    transformer: numericTransformer,
  })
  unitPrice!: number;

  @ManyToOne(() => ErpRequest, (request) => request.items, { onDelete: "CASCADE" })
  request!: ErpRequest;
}
