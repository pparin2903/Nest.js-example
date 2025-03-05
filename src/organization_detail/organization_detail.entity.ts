import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('organization_detail')
export class OrganizationDetail {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  org_id: number;
  @Column({ type: 'bigint' })
  dept_id: number;
  @Column({ type: 'boolean' })
  org_detail_status: boolean;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
