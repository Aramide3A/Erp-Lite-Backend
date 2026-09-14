import { Column, Entity, Index, ManyToMany } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { Role } from "./role.entity";

@Entity({ name: "permissions" })
@Index(["module", "action"], { unique: true })
export class Permission extends AppBaseEntity {
  @Column({ type: "varchar", length: 80 })
  module!: string;

  @Column({ type: "varchar", length: 40 })
  action!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];
}
