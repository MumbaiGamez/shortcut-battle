import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ primaryKey: true }) userId!: string;
  @Column lang!: string;
}
