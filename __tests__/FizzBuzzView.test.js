import React from 'react';
import renderer from 'react-test-renderer';
import FizzBuzzView from '../components/FizzBuzzView';

describe('FizzBuzzView Component Tests', () => {
    describe('FizzBuzzView Snapshot Test', () => {
        it('should not have its UI', () => {
            const tree = renderer.create(<FizzBuzzView></FizzBuzzView>);

            expect(tree).toMatchSnapshot();
        })
    })
});