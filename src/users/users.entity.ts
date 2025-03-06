import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  user_name: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ type: 'varchar', length: 255 })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  first_name: string;
  @Column({ type: 'varchar', length: 255 })
  last_name: string;
  @Column({ type: 'boolean' })
  user_status: boolean;
  @Column({ type: 'varchar', length: 255 })
  user_state: string;
  @Column({ type: 'bigint', default: 0 })
  org_id: number;
  @Column({ type: 'bigint', default: 0 })
  dept_id: number;
  @Column({ type: 'bigint', default: 0 })
  role_id: number;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}

export interface UserState {
  id: number;
  user_state: string;
}
