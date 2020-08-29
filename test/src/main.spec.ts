import 'source-map-support/register';
import { expect } from 'chai';
import { pipe } from '../..';
import { $, should } from '@singular/validators';

describe('Pipes', function() {

  it('should trim strings correctly', async function() {

    let pipes = pipe.trim.__exec();

    expect(await pipes(' string    ')).to.equal('string');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.ltrim.__exec();

    expect(await pipes(' string    ')).to.equal('string    ');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.rtrim.__exec();

    expect(await pipes(' string    ')).to.equal(' string');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should change strings casing correctly', async function() {

    let pipes = pipe.uppercase.__exec();

    expect(await pipes('string')).to.equal('STRING');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.lowercase.__exec();

    expect(await pipes('String')).to.equal('string');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should replace parts in strings correctly', async function() {

    let pipes = pipe.replace('s', 'ss').__exec();

    expect(await pipes('strings')).to.equal('sstrings');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.replace(/ring/gi, 'O').__exec();

    expect(await pipes('A string is a STRING')).to.equal('A stO is a STO');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should split strings into arrays correctly', async function() {

    let pipes = pipe.split(',').__exec();

    expect(await pipes('1,2,3,4')).to.deep.equal(['1','2','3','4']);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.split(/\s*,\s*/).__exec();

    expect(await pipes('1,   2    , 3,4')).to.deep.equal(['1','2','3','4']);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should join arrays into strings correctly', async function() {

    let pipes = pipe.join(',').__exec();

    expect(await pipes([1,2,3,4])).to.equal('1,2,3,4');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should slice strings and arrays correctly', async function() {

    let pipes = pipe.slice(3, 5).__exec();

    expect(await pipes([1,2,3,4,5,6,7])).to.deep.equal([4, 5]);
    expect(await pipes('abcdefg')).to.equal('de');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.slice(1).__exec();

    expect(await pipes([1,2,3,4,5,6,7])).to.deep.equal([2, 3, 4, 5, 6, 7]);
    expect(await pipes('abcdefg')).to.equal('bcdefg');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.slice(-2).__exec();

    expect(await pipes([1,2,3,4,5,6,7])).to.deep.equal([6, 7]);
    expect(await pipes('abcdefg')).to.equal('fg');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should map arrays correctly', async function() {

    let pipes = pipe.map(v => v + 1).__exec();

    expect(await pipes([1,2,3,4])).to.deep.equal([2,3,4,5]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.map(() => {}).__exec();

    expect(await pipes([1,2,3,4])).to.deep.equal([undefined,undefined,undefined,undefined]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should filter arrays correctly', async function() {

    let pipes = pipe.filter(v => typeof v === 'number').__exec();

    expect(await pipes([1,false,null,undefined,2,'string',3])).to.deep.equal([1,2,3]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.filter(should.be.boolean).__exec();

    expect(await pipes([true, 1, false, 'string', null])).to.deep.equal([true, false]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.filter(async value => value === null).__exec();

    expect(await pipes([true, 1, false, 'string', null])).to.deep.equal([null]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should reduce arrays correctly', async function() {

    let pipes = pipe.reduce((a, b) => a + b).__exec();

    expect(await pipes([1,2,3,4])).to.equal(10);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.reduce((a, b) => ({ a: a.a + b.a, b: a.b + b.b })).__exec();

    expect(await pipes([{ a: 1, b: 0 }, { a: 0, b: 2 }, { a: 0, b: 5 }])).to.deep.equal({ a: 1, b: 7 });
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should conditionally pipe values correctly', async function() {

    const body1 = {
      operation: 'addition',
      value1: 2,
      value2: 1,
      value3: undefined
    };

    const body2 = {
      operation: 'subtraction',
      value1: 2,
      value2: 1,
      value3: undefined
    };

    const operationIs = (operation: string) => {

      return (value: any, rawValues?: any) => {

        return rawValues?.operation === operation;

      };

    }

    let pipes = pipe.setRef('value1').incrementRef('value2').when(operationIs('addition')).__exec();

    expect(await pipes(body1.value3, body1)).to.equal(3);
    expect(await pipes(body2.value3, body2)).to.be.undefined;

    pipes = pipe.setRef('value1').decrementRef('value2').when($('operation').equals('subtraction')).__exec();

    expect(await pipes(body1.value3, body1)).to.be.undefined;
    expect(await pipes(body2.value3, body2)).to.equal(1);

  });

});
