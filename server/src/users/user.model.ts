import { getModelForClass, index, pre, prop, queryMethod, types } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { ROLES } from '../accounts/accounts.constants';

interface QueryHelpers {
  findByEmail: types.AsQueryMethod<typeof findByEmail>;
  findByRefreshToken: types.AsQueryMethod<typeof findByRefreshToken>;
}

/**
 * Find a user by their email address.
 *
 * @param {types.QueryHelperThis<typeof User, QueryHelpers>} this
 * @param {string} email
 * @return {*}
 */
function findByEmail(this: types.QueryHelperThis<typeof User, QueryHelpers>, email: string) {
  return this.findOne({ email });
}

/**
 * Find a user by their `refreshToken` value.
 *
 * @param {types.QueryHelperThis<typeof User, QueryHelpers>} this
 * @param {string} refreshToken
 *
 * @return {*}
 */
function findByRefreshToken(this: types.QueryHelperThis<typeof User, QueryHelpers>, refreshToken: string) {
  return this.findOne({ refreshTokens: refreshToken });
}

class Role {
  @prop({ required: true })
  public name!: string;
}

/**
 * Define the dbase model for a User, adding some custome lookup
 * functions, to get the user by their email or refreshToken.
 *
 * @class User
 */
@pre<User>('save', async function () {
  // Ensure password has been modified.
  if (!this.isModified('passowrd')) {
    return;
  }

  // Generate a salt and has the password.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
})
@queryMethod(findByEmail)
@queryMethod(findByRefreshToken)
@index({ email: 1 })
export class User {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ type: [Number], required: true, default: ROLES.USER })
  public roles!: number[];

  @prop({ type: [String] })
  public refreshTokens!: string[];

  @prop({ required: false })
  public firstName!: string;

  @prop({ required: false })
  public lastName!: string;
}

/**
 * This is the model used to interact with the dbase, to
 * Create/Read/Update/Delete users.
 */
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
