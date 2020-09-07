import { PipeFunction, AsyncPipeFunction, TransformationDefinition, resolveRef, ValidatorFunction, AsyncValidatorFunction } from '@singular/common';
import { DateTime } from 'luxon';

const pipes = {
  trim: <PipeFunction>(value => typeof value === 'string' ? value.trim() : undefined),
  ltrim: <PipeFunction>(value => typeof value === 'string' ? value.trimLeft() : undefined),
  rtrim: <PipeFunction>(value => typeof value === 'string' ? value.trimRight() : undefined),
  uppercase: <PipeFunction>(value => typeof value === 'string' ? value.toUpperCase() : undefined),
  lowercase: <PipeFunction>(value => typeof value === 'string' ? value.toLowerCase() : undefined),
  replace: (target: string|RegExp, replacement: string) => <PipeFunction>(value => typeof value === 'string' ? value.replace(target, replacement) : undefined),
  split: (splitter: string|RegExp) => <PipeFunction>(value => typeof value === 'string' ? value.split(splitter) : undefined),
  join: (separator: string) => <PipeFunction>(value => value && typeof value === 'object' && value.constructor === Array ? value.join(separator) : undefined),
  slice: (start: number, end?: number) => <PipeFunction>(value => {

    if ( typeof value === 'string' || (value && typeof value === 'object' && value.constructor === Array) ) return value.slice(start, end);
    else return undefined;

  }),
  map: (cb: (value: any, index: number, array: any[]) => any) => <PipeFunction>(value => value && typeof value === 'object' && value.constructor === Array ? value.map(cb) : undefined),
  filter: (predicate: ((value: any, array: any[], index: number) => boolean)|ValidatorFunction|AsyncValidatorFunction) => <AsyncPipeFunction>(async value => {

    if ( ! value || typeof value !== 'object' || value.constructor !== Array ) return undefined;

    const kept = [];

    for ( let i = 0; i < value.length; i++ ) {

      const result = await predicate(value[i], value, i);

      if ( ! result || result instanceof Error ) continue;

      kept.push(value[i]);

    }

    return kept;

  }),
  reduce: (cb: (previousValue: any, currentValue: any, currentIndex: any, array: any[]) => any) => <PipeFunction>(value => value && typeof value === 'object' && value.constructor === Array && value.length ? value.reduce(cb) : undefined),
  sort: (cb?: (a: any, b: any) => number) => <PipeFunction>(value => value && typeof value === 'object' && value.constructor === Array ? value.sort(cb) : undefined),
  keys: <PipeFunction>(value => value && typeof value === 'object' && (value.constructor === Object || value.constructor === Array) ? Object.keys(value) : undefined),
  values: <PipeFunction>(value => value && typeof value === 'object' && (value.constructor === Object || value.constructor === Array) ? Object.values(value) : undefined),
  increment: (by: number) => <PipeFunction>(value => +value + by),
  incrementRef: (ref: string) => <PipeFunction>((value, rawValues) => pipes.increment(+resolveRef(ref, rawValues))(value)),
  decrement: (by: number) => <PipeFunction>(value => +value - by),
  decrementRef: (ref: string) => <PipeFunction>((value, rawValues) => pipes.decrement(+resolveRef(ref, rawValues))(value)),
  multiply: (by: number) => <PipeFunction>(value => +value * by),
  multiplyRef: (ref: string) => <PipeFunction>((value, rawValues) => pipes.multiply(+resolveRef(ref, rawValues))(value)),
  divide: (by: number) => <PipeFunction>(value => +value / by),
  divideRef: (ref: string) => <PipeFunction>((value, rawValues) => pipes.divide(+resolveRef(ref, rawValues))(value)),
  mod: (by: number) => <PipeFunction>(value => +value % by),
  modRef: (ref: string) => <PipeFunction>((value, rawValues) => pipes.mod(+resolveRef(ref, rawValues))(value)),
  round: <PipeFunction>(value => Math.round(+value)),
  ceil: <PipeFunction>(value => Math.ceil(+value)),
  floor: <PipeFunction>(value => Math.floor(+value)),
  abs: <PipeFunction>(value => Math.abs(+value)),
  negate: <PipeFunction>(value => -value),
  min: (...values: number[]) => <PipeFunction>(value => Math.min(+value, ...values)),
  minRef: (...refs: string[]) => <PipeFunction>((value, rawValues) => pipes.min(...refs.map(ref => +resolveRef(ref, rawValues)))(value)),
  max: (...values: number[]) => <PipeFunction>(value => Math.max(+value, ...values)),
  maxRef: (...refs: string[]) => <PipeFunction>((value, rawValues) => pipes.max(...refs.map(ref => +resolveRef(ref, rawValues)))(value)),
  keep: (regex: RegExp, group: number|string) => <PipeFunction>(value => {

    if ( typeof value !== 'string' ) return undefined;

    const match = value.match(regex);

    if ( ! match ) return undefined;

    if ( typeof group === 'number' ) return match[group + 1];
    if ( ! match.groups ) return undefined;
    return match.groups[group];

  }),
  format: (tokens: string) => <PipeFunction>(value => {

    if ( typeof value !== 'string' && typeof value !== 'number' ) return undefined;

    const formatted = DateTime.fromJSDate(new Date(value)).toFormat(tokens);

    if ( formatted === 'Invalid DateTime' ) return undefined;

    return formatted;

  }),
  toNumber: <PipeFunction>(value => +value),
  toString: <PipeFunction>(value => value + ''),
  toBoolean: <PipeFunction>(value => !! value),
  toDate: <PipeFunction>(value => DateTime.fromJSDate(new Date(value))),
  set: (value: any) => <PipeFunction>(() => value),
  setRef: (ref: string) => <PipeFunction>((value, rawValues) => resolveRef(ref, rawValues)),
  children: (transformer: TransformationDefinition|PipeFunction|AsyncPipeFunction, localRefs?: boolean) => {

    return async (value: any, rawValues?: any) => {

      // If value is of type object
      if ( !! value && typeof value === 'object' ) {

        // If object
        if ( value.constructor === Object ) {

          // If transformer is a direct function
          if ( typeof transformer === 'function' ) return await transformer(value, localRefs ? value : rawValues);

          // Otherwise (it's a transformation definition object)
          for ( const key in transformer ) {

            let keyTransformer = transformer[key];

            // If key transformer is ExecutablePipes, execute it to get a single pipe function
            if ( typeof keyTransformer !== 'function' ) keyTransformer = keyTransformer.__exec();

            value[key] = await keyTransformer(value[key], localRefs ? value : rawValues);

          }

          return value;

        }
        // If array
        else if ( value.constructor === Array ) {

          // Iterate through the array
          for ( let i = 0; i < value.length; i++ ) {

            // If transformer is a direct function
            if ( typeof transformer === 'function' ) {

              value[i] = await transformer(value[i], localRefs ? value[i] : rawValues);
              continue;

            }

            // Otherwise (it's a transformation definition object)
            if ( ! value[i] || typeof value[i] !== 'object' || value[i].constructor !== Object ) {

              value[i] = undefined;
              continue;

            }

            for ( const key in transformer ) {

              let keyTransformer = transformer[key];

              // If key transformer is ExecutablePipes, execute it to get a single pipe function
              if ( typeof keyTransformer !== 'function' ) keyTransformer = keyTransformer.__exec();

              value[i][key] = await keyTransformer(value[i][key], localRefs ? value[i] : rawValues);

            }

          }

          return value;

        }

      }

      return undefined;

    };

  }
};

export default pipes;
