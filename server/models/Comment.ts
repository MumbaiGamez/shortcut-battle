import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Post, User } from '.';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  text!: string;

  @ForeignKey(() => User)
  @Column
  authorId!: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId!: number;
  @BelongsTo(() => Post)
  post: Post;

  @AllowNull
  @ForeignKey(() => Comment)
  @Column
  parentCommentId?: number;
  @BelongsTo(() => Comment, { constraints: false })
  parentComment: Comment;
  @HasMany(() => Comment, { constraints: false })
  comments: Comment[];
}
