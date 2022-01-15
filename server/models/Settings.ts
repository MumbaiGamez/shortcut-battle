import {
  Model,
  Table,
  Column,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '.';

@Table({
  timestamps: false,
  tableName: 'settings',
})
export class Settings extends Model {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: string;

  @ForeignKey(() => User)
  @Column
  user_id!: string;

  @Column
  lang: string;
}
