import { PipeFunction, resolveRef } from '@singular/core';
import { DateTime } from 'luxon';

const pipes = {
  trim: <PipeFunction>(value => value?.trim()),
  ltrim: <PipeFunction>(value => value?.trimLeft()),
  rtrim: <PipeFunction>(value => value?.trimRight()),
  uppercase: <PipeFunction>(value => value?.toUpperCase()),
  lowercase: <PipeFunction>(value => value?.toLowerCase()),
  replace: (target: string|RegExp, replacement: string) => <PipeFunction>(value => value?.replace(target, replacement)),
  split: (splitter: string) => <PipeFunction>(value => value?.split(splitter)),
  join: (separator: string) => <PipeFunction>(value => value?.join(separator)),
  slice: (start: number, end?: number) => <PipeFunction>(value => {

    if ( typeof value === 'string' || (value && typeof value === 'object' && value.constructor === Array ) ) return value.slice(start, end);
    else return undefined;

  }),
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

    const formatted = DateTime.fromJSDate(new Date(value)).toFormat(tokens);

    if ( formatted === 'Invalid DateTime' ) return undefined;

    return formatted;

  }),
  toNumber: <PipeFunction>(value => +value),
  toString: <PipeFunction>(value => value + ''),
  toBoolean: <PipeFunction>(value => !! value),
  set: (value: any) => <PipeFunction>(() => value),
  setRef: (ref: string) => <PipeFunction>((value, rawValues) => resolveRef(ref, rawValues))
};

export default pipes;
