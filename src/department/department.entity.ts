import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  dept_code: string;
  @Column({ type: 'varchar', length: 255 })
  dept_name: string;
  @Column({ type: 'bigint' })
  user_id_head_dept: number;
  @Column({ type: 'boolean' })
  dept_status: boolean;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
