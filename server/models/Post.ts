import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Comment, User } from '.';

@Table({
  tableName: 'posts',
})
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  title!: string;

  @Column
  text!: string;

  @ForeignKey(() => User)
  @Column
  authorId!: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
