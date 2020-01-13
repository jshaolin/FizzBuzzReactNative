import React from 'react';
import renderer from 'react-test-renderer';
import FilteredList from '../components/FilteredList';

describe('FilteredList Component Tests', () => {
    describe('FilteredList Snapshot Test', () => {
        it('should not have its UI', () => {
            const tree = renderer.create(<FilteredList></FilteredList>);

            expect(tree).toMatchSnapshot();
        })
    })
});