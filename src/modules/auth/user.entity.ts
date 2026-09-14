import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AppBaseEntity } from "../../common/entities/app-base.entity";
import { Role } from "./role.entity";

export type UserStatus = "Active" | "Inactive";

@Entity({ name: "users" })
export class User extends AppBaseEntity {
  @Column({ type: "varchar", length: 140 })
  name!: string;

  @Column({ type: "varchar", length: 180, unique: true })
  email!: string;

  @Column({ name: "password_hash", type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ type: "varchar", length: 20, default: "Active" })
  status!: UserStatus;

  @ManyToOne(() => Role, (role) => role.users, { eager: true, nullable: false })
  @JoinColumn({ name: "role_id" })
  role!: Role;

  @Column({ name: "last_login_at", type: "timestamptz", nullable: true })
  lastLoginAt?: Date | null;
}
