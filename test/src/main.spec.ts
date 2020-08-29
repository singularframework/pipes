import 'source-map-support/register';
import { expect } from 'chai';
import { pipe } from '../..';
import { ValidatorFunction } from '@singular/core';

describe('Pipes', function() {

  it('should pipe values conditionally correctly', async function() {

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

    const operationIs = (operation: string): ValidatorFunction => {

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
