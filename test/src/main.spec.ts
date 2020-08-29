import 'source-map-support/register';
import { expect } from 'chai';
import { pipe } from '../..';

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

    pipes = pipe.setRef('value1').decrementRef('value2').when(operationIs('subtraction')).__exec();

    expect(await pipes(body1.value3, body1)).to.be.undefined;
    expect(await pipes(body2.value3, body2)).to.equal(1);

  });

});
