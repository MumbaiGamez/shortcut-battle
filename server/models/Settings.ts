import {
  Model,
  Table,
  Column,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

import { User } from '.';

export interface SettingsAttributes {
  id: number;
  userId: string;
  lang?: string;
}

export type SettingsCreationAttributes = Optional<SettingsAttributes, 'id'>;

@Table({
  timestamps: false,
  tableName: 'settings',
})
export class Settings extends Model<
  SettingsAttributes,
  SettingsCreationAttributes
> {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @Column
  lang: string;
}
