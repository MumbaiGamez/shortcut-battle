import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column userId!: string;
  @Column lang!: string;
}
