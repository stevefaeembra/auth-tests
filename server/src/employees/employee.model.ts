import { getModelForClass, index, pre, prop, queryMethod, types } from '@typegoose/typegoose';

// interface QueryHelpers {
//   findByEmail: types.AsQueryMethod<typeof findByEmail>;
//   findByRefreshToken: types.AsQueryMethod<typeof findByRefreshToken>;
// }

class Employee {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public surname!: string;
}

/**
 * This is the model used to interact with the dbase, to
 * Create/Read/Update/Delete users.
 */
export const EmployeeModel = getModelForClass<typeof Employee>(Employee);
