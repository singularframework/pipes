import 'source-map-support/register';
import { ValidatorFunction, AsyncValidatorFunction, PipeFunction, AsyncPipeFunction, ExecutableValidators } from '@singular/core';
import pipes from './definitions';

export class Pipes {

  constructor(
    private __pipes: PipeFunction[] = [],
    private __conditions: AsyncValidatorFunction[] = []
  ) { }

  /**
  * NO NEED TO CALL THIS METHOD
  *
  * Returns a PipeFunction which transforms the value through all used pipes.
  */
  public __exec(): AsyncPipeFunction {

    return async (value: any, rawValues?: any) => {

      // If has conditions
      if ( this.__conditions.length ) {

        for ( const condition of this.__conditions ) {

          const result = await condition(value, rawValues);

          if ( ! result || result instanceof Error ) return value;

        }

      }

      // Pipe the value
      let pipedValue = value;

      for ( const pipe of this.__pipes ) {

        pipedValue = pipe(pipedValue, rawValues);

      }

      return pipedValue;

    };

  }

  /** Trims the value. */
  public get trim() {

    return new Pipes(this.__pipes.concat(pipes.trim));

  }

  /** Trims the value from left. */
  public get ltrim() {

    return new Pipes(this.__pipes.concat(pipes.ltrim));

  }

  /** Trims the value from right. */
  public get rtrim() {

    return new Pipes(this.__pipes.concat(pipes.rtrim));

  }

  /** Converts the value to uppercase. */
  public get uppercase() {

    return new Pipes(this.__pipes.concat(pipes.uppercase));

  }

  /** Converts the value to lowercase. */
  public get lowercase() {

    return new Pipes(this.__pipes.concat(pipes.lowercase));

  }

  /** Replaces the target inside the value with the replacement. */
  public replace(target: string|RegExp, replacement: string) {

    return new Pipes(this.__pipes.concat(pipes.replace(target, replacement)));

  }

  /** Splits the value into an array. */
  public split(splitter: string) {

    return new Pipes(this.__pipes.concat(pipes.split(splitter)));

  }

  /** Joins an array into a string. */
  public join(separator: string) {

    return new Pipes(this.__pipes.concat(pipes.join(separator)));

  }

  /** Returns a portion of the value based on start and end positions using 'value.slice(start, end)'. */
  public slice(start: number, end?: number) {

    return new Pipes(this.__pipes.concat(pipes.slice(start, end)));

  }

  /** Returns keys of value using 'Object.keys()'. */
  public get keys() {

    return new Pipes(this.__pipes.concat(pipes.keys));

  }

  /** Returns values of value using 'Object.values()'. */
  public get values() {

    return new Pipes(this.__pipes.concat(pipes.values));

  }

  /** Increments the value (casted to number) by the given number. */
  public increment(by: number) {

    return new Pipes(this.__pipes.concat(pipes.increment(by)));

  }

  /** Increments the value (casted to number) by the value resolved from reference (casted to number). */
  public incrementRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.incrementRef(ref)));

  }

  /** Decrements the value (casted to number) by the given number. */
  public decrement(by: number) {

    return new Pipes(this.__pipes.concat(pipes.decrement(by)));

  }

  /** Decrements the value (casted to number) by the value resolved from reference (casted to number). */
  public decrementRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.decrementRef(ref)));

  }

  /** Multiplies the value (casted to number) by the given number. */
  public multiply(by: number) {

    return new Pipes(this.__pipes.concat(pipes.multiply(by)));

  }

  /** Multiplies the value (casted to number) by the value resolved from reference (casted to number). */
  public multiplyRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.multiplyRef(ref)));

  }

  /** Divides the value (casted to number) by the given number. */
  public divide(by: number) {

    return new Pipes(this.__pipes.concat(pipes.divide(by)));

  }

  /** Divides the value (casted to number) by the value resolved from reference (casted to number). */
  public divideRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.divideRef(ref)));

  }

  /** Returns the remainder after dividing the value (casted to number) by the given number. */
  public mod(by: number) {

    return new Pipes(this.__pipes.concat(pipes.mod(by)));

  }

  /** Returns the remainder after dividing the value (casted to number) by the value resolved from reference (casted to number). */
  public modRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.modRef(ref)));

  }

  /** Rounds the value (casted to number) to the nearest integer. */
  public get round() {

    return new Pipes(this.__pipes.concat(pipes.round));

  }

  /** Rounds the value (casted to number) up to the nearest integer. */
  public get ceil() {

    return new Pipes(this.__pipes.concat(pipes.ceil));

  }

  /** Rounds the value (casted to number) down to the nearest integer. */
  public get floor() {

    return new Pipes(this.__pipes.concat(pipes.floor));

  }

  /** Returns the absolute value of the value (casted to number). */
  public get abs() {

    return new Pipes(this.__pipes.concat(pipes.abs));

  }

  /** Negates the value (casted to number). */
  public get negate() {

    return new Pipes(this.__pipes.concat(pipes.negate));

  }

  /** Returns the minimum of the value (casted to number) with the given values. */
  public min(...values: number[]) {

    return new Pipes(this.__pipes.concat(pipes.min(...values)));

  }

  /** Returns the minimum of the value (casted to number) with the values resolved from reference (casted to number). */
  public minRef(...refs: string[]) {

    return new Pipes(this.__pipes.concat(pipes.minRef(...refs)));

  }

  /** Returns the maximum of the value (casted to number) with the given values. */
  public max(...values: number[]) {

    return new Pipes(this.__pipes.concat(pipes.max(...values)));

  }

  /** Returns the minimum of the value (casted to number) with the values resolved from reference (casted to number). */
  public maxRef(...refs: string[]) {

    return new Pipes(this.__pipes.concat(pipes.maxRef(...refs)));

  }

  /**
  * Returns a matched group from matching the value with the given regular expression.
  *
  * Regular expression should not have the global flag for this to work.
  * Group indicator can be the index of the group (starting from 0) or the name of the group (if named groups are used).
  */
  public keep(regex: RegExp, group: number|string) {

    return new Pipes(this.__pipes.concat(pipes.keep(regex, group)));

  }

  /**
  * Converts the value to date and then formats it into a string using the given tokens.
  *
  * This pipe uses Luxon under the hood. To see a list of available tokens, visit https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens.
  */
  public format(tokens: string) {

    return new Pipes(this.__pipes.concat(pipes.format(tokens)));

  }

  /** Casts the value to number. */
  public get toNumber() {

    return new Pipes(this.__pipes.concat(pipes.toNumber));

  }

  /** Casts the value to string. */
  public get toString() {

    return new Pipes(this.__pipes.concat(pipes.toString));

  }

  /** Casts the value to boolean. */
  public get toBoolean() {

    return new Pipes(this.__pipes.concat(pipes.toBoolean));

  }

  /** Sets the value to the given value. */
  public set(value: any) {

    return new Pipes(this.__pipes.concat(pipes.set(value)));

  }

  /** Sets the value to the value resolved from reference. */
  public setRef(ref: string) {

    return new Pipes(this.__pipes.concat(pipes.setRef(ref)));

  }

  /** Applies the pipes only if the given conditions are true. */
  public when(
    condition: ValidatorFunction|AsyncValidatorFunction|ExecutableValidators,
    ...additionalConditions: Array<ValidatorFunction|AsyncValidatorFunction|ExecutableValidators>
  ) {

    return new Pipes(
      this.__pipes,
      [].concat(
        typeof condition === 'function' ? condition : condition.__exec(),
        ...additionalConditions.map(condition => typeof condition === 'function' ? condition : condition.__exec())
      )
    );

  }

  /** Applies the pipes only if the given conditions are true. */
  public if(
    condition: ValidatorFunction|AsyncValidatorFunction|ExecutableValidators,
    ...additionalConditions: Array<ValidatorFunction|AsyncValidatorFunction|ExecutableValidators>
  ) {

    return this.when(condition, ...additionalConditions);

  }

  /** Returns a new validator that validates the piped value using a given validator. */
  public then(validator: ValidatorFunction|AsyncValidatorFunction) {

    return <ValidatorFunction|AsyncValidatorFunction>((value: any, rawValues?: any) => {

      return validator(this.__exec()(value, rawValues), rawValues);

    });

  }

}

export const pipe: Omit<Pipes, 'then'> = new Pipes();
