import {
  Model,
  Table,
  Column,
  PrimaryKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';

import { Settings, Comment, Post } from '.';

export interface UserAttributes {
  id: string;
  login: string;
}

@Table({
  timestamps: false,
  tableName: 'users',
})
export class User extends Model<UserAttributes, UserAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  login!: string;

  @HasOne(() => Settings)
  settings: Settings;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];
}
