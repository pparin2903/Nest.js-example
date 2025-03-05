import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('organization')
export class Organization {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  org_code: string;
  @Column({ type: 'varchar', length: 255 })
  org_name: string;
  @Column({ type: 'boolean' })
  org_status: boolean;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
