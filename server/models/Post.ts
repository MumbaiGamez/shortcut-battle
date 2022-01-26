import { Optional } from 'sequelize';
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

import { Comment, User, UserAttributes } from '.';

export interface PostAttributes {
  id: number;
  title: string;
  text: string;
  authorId: UserAttributes['id'];
}

export type PostCreationAttributes = Optional<PostAttributes, 'id'>;

@Table({
  tableName: 'posts',
})
export class Post extends Model<PostAttributes, PostCreationAttributes> {
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
