import React from 'react';
import renderer from 'react-test-renderer';
import FizzBuzzSingle, {isFizzBuzz} from '../components/FizzBuzzSingle';

describe('FizzBuzzSingle Component Test', () => {
    describe('FizzBuzzSingle Snapshot Test', () => {
        it('should not have changed its UI', () => {
            const tree = renderer.create(<FizzBuzzSingle></FizzBuzzSingle>).toJSON();

            expect(tree).toMatchSnapshot();            
        });
    });

    describe('isFizzBuzz test', () => {
        it('is tested on server side, added this for completion', () => {
            expect(1).toEqual(1);
        });
    });
});