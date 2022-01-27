import { Optional } from 'sequelize';
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

import { Post, PostAttributes, User, UserAttributes } from '.';

export interface CommentAttributes {
  id: number;
  text: string;
  authorId: UserAttributes['id'];
  postId: PostAttributes['id'];
  parentCommentId?: number;
}

export type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

@Table({
  tableName: 'comments',
})
export class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  text!: string;

  @ForeignKey(() => User)
  @Column
  authorId!: string;

  @ForeignKey(() => Post)
  @Column
  postId!: number;

  @AllowNull
  @ForeignKey(() => Comment)
  @Column
  parentCommentId?: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => Comment, { constraints: false })
  parentComment: Comment;

  @HasMany(() => Comment, { constraints: false })
  comments: Comment[];
}
