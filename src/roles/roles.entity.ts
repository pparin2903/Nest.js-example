import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  role_code: string;
  @Column({ type: 'varchar', length: 255 })
  role_name: string;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
