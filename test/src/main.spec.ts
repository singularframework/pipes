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

  it('should sort arrays correctly', async function() {

    let pipes = pipe.sort().__exec();

    expect(await pipes([4,3,1,2])).to.deep.equal([1,2,3,4]);
    expect(await pipes([10,4,3,1,2])).to.deep.equal([1,10,2,3,4]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.sort((a, b) => a - b).__exec();

    expect(await pipes([4,3,1,2])).to.deep.equal([1,2,3,4]);
    expect(await pipes([10,4,3,1,2])).to.deep.equal([1,2,3,4,10]);

    pipes = pipe.sort((a, b) => b - a).__exec();

    expect(await pipes([4,3,1,2])).to.deep.equal([4,3,2,1]);
    expect(await pipes([10,4,3,1,2])).to.deep.equal([10,4,3,2,1]);

  });

  it('should pipe keys correctly', async function() {

    let pipes = pipe.keys.__exec();

    expect(await pipes([4,3,1,2])).to.deep.equal(["0","1","2","3"]);
    expect(await pipes({a: true, b: false, c: null})).to.deep.equal(['a', 'b', 'c']);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should pipe values correctly', async function() {

    let pipes = pipe.values.__exec();

    expect(await pipes([4,3,1,2])).to.deep.equal([4,3,1,2]);
    expect(await pipes({a: true, b: false, c: null})).to.deep.equal([true,false,null]);
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should pipe using mathematics correctly', async function() {

    let pipes = pipe.increment(3).decrement(2).multiply(10).divide(5).__exec();

    expect(await pipes(1)).to.equal(4);
    expect(await pipes(34)).to.equal(70);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(2);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(2);

    pipes = pipe.mod(2).__exec();

    expect(await pipes(1)).to.equal(1);
    expect(await pipes(34)).to.equal(0);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.negate.__exec();

    expect(await pipes(1)).to.equal(-1);
    expect(await pipes(-34)).to.equal(34);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.abs.__exec();

    expect(await pipes(1)).to.equal(1);
    expect(await pipes(-34)).to.equal(34);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.round.__exec();

    expect(await pipes(1.49)).to.equal(1);
    expect(await pipes(2.78)).to.equal(3);
    expect(await pipes(4.5)).to.equal(5);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.ceil.__exec();

    expect(await pipes(1.49)).to.equal(2);
    expect(await pipes(2.78)).to.equal(3);
    expect(await pipes(4.5)).to.equal(5);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.floor.__exec();

    expect(await pipes(1.49)).to.equal(1);
    expect(await pipes(2.78)).to.equal(2);
    expect(await pipes(4.5)).to.equal(4);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.min(10, 100).__exec();

    expect(await pipes(20)).to.equal(10);
    expect(await pipes(12)).to.equal(10);
    expect(await pipes(3)).to.equal(3);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(0);

    pipes = pipe.max(10, 100).__exec();

    expect(await pipes(20)).to.equal(100);
    expect(await pipes(12)).to.equal(100);
    expect(await pipes(104)).to.equal(104);
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes(null)).to.equal(100);
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(false)).to.equal(100);

  });

  it('should pipe by reference using mathematics correctly', async function() {

    const values = { three: 3, two: 2, ten: 10, five: 5, hundred: 100, false: false };
    let pipes = pipe.incrementRef('three').decrementRef('two').multiplyRef('ten').divideRef('five').incrementRef('false').__exec();

    expect(await pipes(1, values)).to.equal(4);
    expect(await pipes(34, values)).to.equal(70);
    expect(await pipes(undefined, values)).to.be.NaN;
    expect(await pipes(null, values)).to.equal(2);
    expect(await pipes('string', values)).to.be.NaN;
    expect(await pipes(false, values)).to.equal(2);

    pipes = pipe.modRef('two').__exec();

    expect(await pipes(1, values)).to.equal(1);
    expect(await pipes(34, values)).to.equal(0);
    expect(await pipes(undefined, values)).to.be.NaN;
    expect(await pipes(null, values)).to.equal(0);
    expect(await pipes('string', values)).to.be.NaN;
    expect(await pipes(false, values)).to.equal(0);

    pipes = pipe.minRef('ten', 'hundred').__exec();

    expect(await pipes(20, values)).to.equal(10);
    expect(await pipes(12, values)).to.equal(10);
    expect(await pipes(3, values)).to.equal(3);
    expect(await pipes(undefined, values)).to.be.NaN;
    expect(await pipes(null, values)).to.equal(0);
    expect(await pipes('string', values)).to.be.NaN;
    expect(await pipes(false, values)).to.equal(0);

    pipes = pipe.maxRef('ten', 'hundred').__exec();

    expect(await pipes(20, values)).to.equal(100);
    expect(await pipes(12, values)).to.equal(100);
    expect(await pipes(104, values)).to.equal(104);
    expect(await pipes(undefined, values)).to.be.NaN;
    expect(await pipes(null, values)).to.equal(100);
    expect(await pipes('string', values)).to.be.NaN;
    expect(await pipes(false, values)).to.equal(100);

  });

  it('should keep matched group from regex correctly', async function() {

    let pipes = pipe.keep(/^(?<firstname>.+)\s+(?<lastname>.+)$/, 'lastname').__exec();

    expect(await pipes('John Slow')).to.equal('Slow');
    expect(await pipes('Cartman     Electra')).to.equal('Electra');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.keep(/^(?<firstname>.+)\s+(?<lastname>.+)$/, 'middlename').__exec();

    expect(await pipes('John Slow')).to.be.undefined;
    expect(await pipes('Cartman     Electra')).to.be.undefined;
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.keep(/^(.+)\s+(.+)$/, 'lastname').__exec();

    expect(await pipes('John Slow')).to.be.undefined;
    expect(await pipes('Cartman     Electra')).to.be.undefined;
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.keep(/^(.+)\s+(.+)$/, 1).__exec();

    expect(await pipes('John Slow')).to.equal('Slow');
    expect(await pipes('Cartman     Electra')).to.equal('Electra');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

    pipes = pipe.keep(/^(.+)\s+(.+)$/, 2).__exec();

    expect(await pipes('John Slow')).to.be.undefined;
    expect(await pipes('Cartman     Electra')).to.be.undefined;
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(123)).to.be.undefined;
    expect(await pipes(false)).to.be.undefined;

  });

  it('should format dates correctly', async function() {

    let pipes = pipe.format('yyyy').__exec();

    expect(await pipes(1598722752724)).to.equal('2020');
    expect(await pipes('2020-08-29T17:39:12.724Z')).to.equal('2020');
    expect(await pipes(undefined)).to.be.undefined;
    expect(await pipes(null)).to.be.undefined;
    expect(await pipes('string')).to.be.undefined;
    expect(await pipes(true)).to.be.undefined;

  });

  it('should cast types correctly', async function() {

    let pipes = pipe.toString.__exec();

    expect(await pipes(123)).to.equal('123');
    expect(await pipes('string')).to.equal('string');
    expect(await pipes(undefined)).to.equal('undefined');
    expect(await pipes(null)).to.equal('null');
    expect(await pipes(false)).to.equal('false');
    expect(await pipes(true)).to.equal('true');
    expect(await pipes([1,2,3])).to.equal('1,2,3');
    expect(await pipes({a:'blah'})).to.equal('[object Object]');
    expect(await pipes({0: 1})).to.equal('[object Object]');

    pipes = pipe.toNumber.__exec();

    expect(await pipes(123)).to.equal(123);
    expect(await pipes('002')).to.equal(2);
    expect(await pipes([1])).to.equal(1);
    expect(await pipes([1,2,3])).to.be.NaN;
    expect(await pipes('string')).to.be.NaN;
    expect(await pipes(undefined)).to.be.NaN;
    expect(await pipes({a:1})).to.be.NaN;
    expect(await pipes(null)).to.equal(0);
    expect(await pipes(false)).to.equal(0);
    expect(await pipes(true)).to.equal(1);

    pipes = pipe.toBoolean.__exec();

    expect(await pipes(123)).to.be.true;
    expect(await pipes('')).to.be.false;
    expect(await pipes('string')).to.be.true;
    expect(await pipes(undefined)).to.be.false;
    expect(await pipes(null)).to.be.false;
    expect(await pipes(false)).to.be.false;
    expect(await pipes(true)).to.be.true;

    pipes = pipe.toDate.__exec();

    expect((await pipes(Date.now())).invalid).to.be.null;
    expect((await pipes('')).invalid).not.to.be.null;
    expect((await pipes(undefined)).invalid).not.to.be.null;
    expect((await pipes(null)).invalid).to.be.null;
    expect((await pipes('2020-9-7')).invalid).to.be.null;
    expect((await pipes(true)).invalid).to.be.null;
    expect((await pipes(false)).invalid).to.be.null;

  });

  it('should set value by value and reference correctly', async function() {

    const body = { dominant: 1990 };
    let pipes = pipe.set(false).__exec();

    expect(await pipes(123)).to.be.false;
    expect(await pipes(undefined)).to.be.false;

    pipes = pipe.setRef('dominant').__exec();

    expect(await pipes(123, body)).to.equal(1990);
    expect(await pipes(undefined, body)).to.equal(1990);

  });

  it('should pipe children of value correctly', async function() {

    const body = {
      arrayOfStrings: [
        '   string   ',
        'String   ',
        '   strinG'
      ],
      arrayOfObjects: [
        { title: 'title1', index: 0 },
        { title: 'title2', index: 1 },
        { title: 'title3', index: 2 }
      ],
      object: {
        value: 'string value',
        other: false
      },
      nestedArray: [
        { type: 'person', info: {
          name: 'Barack Osama',
          age: 59,
          children: [
            { name: 'Malia Ann Osama', age: 22 },
            { name: 'Sasha Osama', age: 19 }
          ]
        }}
      ]
    };

    let pipes = pipe.children(pipe.lowercase.trim).__exec();

    expect(await pipes(body.arrayOfStrings, body)).to.deep.equal(['string','string','string']);
    expect(await pipes(undefined, body)).to.be.undefined;
    expect(await pipes(null, body)).to.be.undefined;
    expect(await pipes(false, body)).to.be.undefined;
    expect(await pipes(123, body)).to.be.undefined;

    pipes = pipe.children({ title: pipe.uppercase, index: pipe.increment(1).__exec() }).__exec();

    expect(await pipes(body.arrayOfObjects, body)).to.deep.equal([
      { title: 'TITLE1', index: 1 },
      { title: 'TITLE2', index: 2 },
      { title: 'TITLE3', index: 3 }
    ]);
    expect(await pipes(undefined, body)).to.be.undefined;
    expect(await pipes(null, body)).to.be.undefined;
    expect(await pipes(false, body)).to.be.undefined;
    expect(await pipes(123, body)).to.be.undefined;
    expect(await pipes(body.arrayOfStrings, body)).to.deep.equal([undefined,undefined,undefined]);

    pipes = pipe.children({ value: pipe.uppercase }).__exec();

    expect(await pipes(body.object, body)).to.have.property('value', 'STRING VALUE');

    // Checking local refs
    pipes = pipe.children({ title: pipe.setRef('object.value').uppercase }).__exec();

    expect(await pipes(body.arrayOfObjects, body)).to.deep.equal([
      { title: 'STRING VALUE', index: 1 },
      { title: 'STRING VALUE', index: 2 },
      { title: 'STRING VALUE', index: 3 }
    ]);

    pipes = pipe.children({ title: pipe.setRef('object.value').uppercase }, true).__exec();

    expect(await pipes(body.arrayOfObjects, body)).to.deep.equal([
      { title: undefined, index: 1 },
      { title: undefined, index: 2 },
      { title: undefined, index: 3 }
    ]);

    pipes = pipe.children({ title: pipe.setRef('index').decrement(1) }, true).__exec();

    expect(await pipes(body.arrayOfObjects, body)).to.deep.equal([
      { title: 0, index: 1 },
      { title: 1, index: 2 },
      { title: 2, index: 3 }
    ]);

    pipes = pipe.children({ value: pipe.setRef('arrayOfObjects.1.index') }).__exec();

    expect(await pipes(body.object, body)).to.have.property('value', 2);

    pipes = pipe.children({ value: pipe.setRef('arrayOfObjects.1.index') }, true).__exec();

    expect(await pipes(body.object, body)).to.have.property('value', undefined);

    pipes = pipe.children({ value: pipe.setRef('other') }, true).__exec();

    expect(await pipes(body.object, body)).to.have.property('value', false);
    expect(await pipes(undefined, body)).to.be.undefined;

    pipes = pipe.children({
      type: value => `$${value}`,
      info: pipe.children({
        children: pipe.children({
          age: pipe.negate
        })
      })
    }).__exec();

    expect(await pipes(body.nestedArray, body)).to.deep.equal([
      { type: '$person', info: {
        name: 'Barack Osama',
        age: 59,
        children: [
          { name: 'Malia Ann Osama', age: -22 },
          { name: 'Sasha Osama', age: -19 }
        ]
      }}
    ]);

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

    pipes = pipe.setRef('value1').decrementRef('value2').if($('operation').equals('subtraction')).__exec();

    expect(await pipes(body1.value3, body1)).to.be.undefined;
    expect(await pipes(body2.value3, body2)).to.equal(1);

  });

  it('should convert pipes to validator correctly', async function() {

    let pipedValue: string;
    await pipe.trim.lowercase.then(value => { pipedValue = value; return true; })(' Freddy Venus   ');

    expect(pipedValue).to.equal('freddy venus');

  });

});
