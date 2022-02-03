import { Optional } from 'sequelize';
import {
  Model,
  Table,
  Column,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';

import { User, UserAttributes } from '.';

export interface SettingsAttributes {
  id: number;
  userId: UserAttributes['id'];
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
  @PrimaryKey
  @Column
  id!: number;

  @AllowNull
  @Column
  lang?: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user: User;
}
