import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity({ name: "roles" })
export class Role extends AppBaseEntity {
  @Column({ type: "varchar", length: 100, unique: true })
  name!: string;

  @Column({ type: "varchar", length: 250, default: "" })
  description!: string;

  @Column({ name: "is_system", type: "boolean", default: false })
  isSystem!: boolean;

  @ManyToMany(() => Permission, (permission) => permission.roles, { eager: true })
  @JoinTable({
    name: "role_permissions",
    joinColumn: { name: "role_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
  })
  permissions!: Permission[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
