import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  menu_code: string;
  @Column({ type: 'varchar', length: 255 })
  menu_name: string;
  @Column({ type: 'varchar', length: 255 })
  menu_path: string;
  @Column({ type: 'bigint' })
  main_menu: number;
  @Column({ type: 'boolean' })
  menu_status: boolean;

  @Column({ type: 'varchar', length: 255 })
  create_by: string;
  @Column({ type: 'varchar', length: 255 })
  update_by: string;
  @CreateDateColumn()
  create_date: Date;
  @UpdateDateColumn()
  update_date: Date;
}
