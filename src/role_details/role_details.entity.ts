import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('role_details')
export class RoleDetail {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  role_id: number;
  @Column({ type: 'bigint' })
  menu_id: number;

  @Column({ default: false })
  query_permission: boolean;
  @Column({ default: false })
  insert_permission: boolean;
  @Column({ default: false })
  update_permission: boolean;
  @Column({ default: false })
  delete_permission: boolean;
  @Column({ default: false })
  export_permission: boolean;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
