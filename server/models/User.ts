import {
  Model,
  Table,
  Column,
  PrimaryKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';

import { Settings, Comment, Post } from '.';

@Table({
  timestamps: false,
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column
  id!: string;

  @HasOne(() => Settings)
  settings: Settings;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];
}
