import { Model, Table, Column } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'users',
})
export class User extends Model {
  @Column({ primaryKey: true })
  id!: string;
}
