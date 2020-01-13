import React from 'react';
import renderer from 'react-test-renderer';
import FizzBuzzBatch from '../components/FizzBuzzBatch';

const someFizzBuzz = [
    {
        number: 3,
        fizzbuzz: 'fizz'
    },
    {
        number: 5,
        fizzbuzz: 'buzz'
    },
    {
        number: 6,
        fizzbuzz: 'fizz'
    },
    {
        number: 9,
        fizzbuzz: 'fizz'
    },
    {
        number: 10,
        fizzbuzz: 'buzz'
    },
    {
        number: 12,
        fizzbuzz: 'fizz'
    },
    {
        number: 15,
        fizzbuzz: 'fizzbuzz'
    }
];

const range1 = {from: 3, to: 5};
const batch1 = [{a: 1, b: 2}, {c: 3, d: 4}];
const range2 = {from: 6, to: 8};
const batch2 = [{e: 5, f: 6}, {g: 7, h: 8}];
const range3 = {from: 9, to: 10};
const batch3 = [{i: 9, j: 10}, {k: 11, l: 12}];
const range4 = {from: 9, to: 11};
const batch4 = [{m: 12, n: 13}, {o: 14, p: 15}];


describe('FizbuzzBuzzBatch', () => {
    
    describe('Snapshot', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should not have its UI', () => {
            const tree = renderer.create(<FizzBuzzBatch></FizzBuzzBatch>).toJSON();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('isIntegerRange method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should determine if a range is given by integers', () => {
            const result3_5 = component.isIntegerRange('3 5');
            expect(result3_5).toEqual(true);

            const resulta_5 = component.isIntegerRange('a 5');
            expect(resulta_5).toEqual(false);

            const result3_b = component.isIntegerRange('3 b');
            expect(result3_b).toEqual(false);

            const result = component.isIntegerRange('');
            expect(result).toEqual(false);
        });
    });

    describe('isOrderedRange method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should determine if the left endpoint of a range is smaller than or equal than the right endpoint', () => {
            const result3_5 = component.isOrderedRange(3, 5);
            expect(result3_5).toEqual(true);

            const result5_3 = component.isOrderedRange(5, 3);
            expect(result5_3).toEqual(false);
        });
    });

    describe('getEndpoints method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should get the endpoints from a range string', () => {
            const result3_5 = component.getEndpoints('3 5');
            expect(result3_5).toEqual(['3', '5']);

            const result6_15 = component.getEndpoints('6 15');
            expect(result6_15).toEqual(['6', '15']);

        });
    });

    describe('toIntEndpoints method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should cast string to integer endpoints', () => {
            const result3_5 = component.toIntEndpoints('3', '5');
            expect(result3_5).toEqual([3, 5]);

            const result30_50 = component.toIntEndpoints('30', '50');
            expect(result30_50).toEqual([30, 50]);
        });
    });

    describe('getValidRange method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should get a range from a valid range string', () => {
            const range3_5 = component.getValidRange('3 5');
            expect(range3_5).toEqual(
                {
                    from: 3,
                    to: 5
                }
            );

            const range5_3 = component.getValidRange('5 3');
            expect(range5_3).toEqual(
                {
                    from: NaN,
                    to: NaN
                }
            );

            const range173_980 = component.getValidRange('173 980');
            expect(range173_980).toEqual(
                {
                    from: 173,
                    to: 980
                }
            );
            
            const invalidRange = component.getValidRange(' 1');
            expect(invalidRange).toEqual(
                {
                    from: NaN,
                    to: NaN
                }
            );
        });
    });

    describe('isCacheFull method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should determine if the cache is full', () => {
            expect(component.isCacheFull()).toEqual(false);
            
            component.cache.set(range1, batch1);
            expect(component.isCacheFull()).toEqual(false);

            component.cache.set(range2, batch2);
            expect(component.isCacheFull()).toEqual(false);

            component.cache.set(range3, batch3);
            expect(component.isCacheFull()).toEqual(true);
        });
    });

    describe('getOldestEntry method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
     it('should get the oldest cache entry', () => {
            component.addToCache(range1, batch1);
            expect(component.cacheAge[0]).toEqual(range1);

            component.addToCache(range2, batch2);
            expect(component.cacheAge[1]).toEqual(range2);

            component.addToCache(range3, batch3);
            expect(component.cacheAge[2]).toEqual(range3);

            component.addToCache(range4, batch4);
            expect(component.cacheAge[2]).toEqual(range4);

            expect(component.getOldestEntry()).toEqual(range2);
            expect(component.getOldestEntry()).toEqual(range3);
            expect(component.getOldestEntry()).toEqual(range4);

        });
    });

    describe('deleteOldestEntry method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should delete the oldest entry in the cache', () => {
            
            component.addToCache(range1, batch1);
            component.addToCache(range2, batch2);
            component.addToCache(range3, batch3);

            component.deleteOldestEntry();
            expect(component.cacheAge[0]).toEqual(range2);
            expect(component.cache.get(range1)).toEqual(undefined);

            component.deleteOldestEntry();
            expect(component.cacheAge[0]).toEqual(range3);
            expect(component.cache.get(range2)).toEqual(undefined);
        });
    });

    describe('addToCache method', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should add to the internal cache to implement the memoization technique', () => {
            expect(component.cache.size).toEqual(0);

            component.addToCache(range1, batch1);
            expect(component.cache.size).toEqual(1);
            const takeBack1 = component.cache.get(range1);
            expect(takeBack1).toEqual(batch1);

            component.addToCache(range2, batch2);
            expect(component.cache.size).toEqual(2);
            const takeBack2 = component.cache.get(range2);
            expect(takeBack2).toEqual(batch2);

            component.addToCache(range3, batch3);
            expect(component.cache.size).toEqual(3);
            const takeBack3 = component.cache.get(range3);
            expect(takeBack3).toEqual(batch3);

            component.addToCache(range4, batch4);
            expect(component.cache.has(range1)).toEqual(false);
            expect(component.cache.size).toEqual(3);
            const takeBack4 = component.cache.get(range4);
            expect(takeBack4).toEqual(batch4);

            const takeBack5 = component.cache.get(range1);
            expect(takeBack5).toEqual(undefined);

            component.cache.delete(range2);
            expect(component.cache.size).toEqual(2);
            component.cache.delete(range3);
            expect(component.cache.size).toEqual(1);
            component.cache.delete(range4);
            expect(component.cache.size).toEqual(0);
        });
    });

    

    /*describe('batchFizzBuzz Test', () => {
        it('should correctly return an array of fizzbuzz objects', () => {
            const fizzBuzz3_5 = batchFizzBuzz(3, 5);
            expect(fizzBuzz3_5).toEqual(
                [
                    {
                        number: 3,
                        fizzbuzz: 'fizz'
                    },
                    {
                        number: 5,
                        fizzbuzz: 'buzz'
                    }
                ]
            );

            const fizzBuzz3_15 = batchFizzBuzz(3, 15);
            expect(fizzBuzz3_15).toEqual(someFizzBuzz);
        });
    });*/

    describe('filterFizzBuzz Test', () => {
        const component = new FizzBuzzBatch({cacheLimit: 3});
        it('should correctly filter a fizzbuzz array', () => {
            const filterByFizz = component.filterFizzBuzz('fizz', someFizzBuzz);
            expect(filterByFizz).toEqual(
                [
                    {
                        number: 3,
                        fizzbuzz: 'fizz'
                    },
                    {
                        number: 6,
                        fizzbuzz: 'fizz'
                    },
                    {
                        number: 9,
                        fizzbuzz: 'fizz'
                    },
                    {
                        number: 12,
                        fizzbuzz: 'fizz'
                    },
                ]
            );

            const filterByBuzz = component.filterFizzBuzz('buzz', someFizzBuzz);
            expect(filterByBuzz).toEqual(
                [
                    {
                        number: 5,
                        fizzbuzz: 'buzz'
                    },
                    {
                        number: 10,
                        fizzbuzz: 'buzz'
                    },
                ]
            );

            const filterByFizzBuzz = component.filterFizzBuzz('fizzbuzz', someFizzBuzz);
            expect(filterByFizzBuzz).toEqual(
                [
                    {
                        number: 15,
                        fizzbuzz: 'fizzbuzz'
                    }
                ]
            );
        });
    });

    /*describe('The FizzBuzz Algorithm Tests', () => {
        describe('isValidRange function', () => {
            it('should correctly check the validity of a range.', () => {
                const valid3_5 = isValidRange(3, 5);
                expect(valid3_5).toEqual(true);

                const valid5_3 = isValidRange(5, 3);
                expect(valid5_3).toEqual(false);
            });
        });

        describe('isInteger function', () => {
            it('should correctly check if an argument is an integer value', () => {
                const result1 = isInteger(1);
                expect(result1).toEqual(true);

                const result_a = isInteger('a');
                expect(result_a).toEqual(false);
            });
        });

        describe('isFizzBuzz function', () => {
            it('should correctly determine the fizzbuzzbility of a number', () => {
                const fizz = isFizzBuzz(3);
                expect(fizz).toEqual('Fizz');

                const buzz = isFizzBuzz(5);
                expect(buzz).toEqual('Buzz');

                const fizzbuzz = isFizzBuzz(15);
                expect(fizzbuzz).toEqual('FizzBuzz');
            });
        });

        describe('fizzBuzz function', () => {
        it('should correctly return the fizzbuzzbility of a range of numbers', () => {
                const fizzBuzz3_5 = fizzBuzz(3, 5);
                expect(fizzBuzz3_5).toEqual(
                [
                    'Fizz',
                    4,
                    'Buzz'
                ]
            );

            const fizzBuzz6_15 = fizzBuzz(6, 15);
            expect(fizzBuzz6_15).toEqual(
                    [
                        'Fizz',
                        7,
                        8,
                        'Fizz',
                        'Buzz',
                        11,
                        'Fizz',
                        13,
                        14,
                        'FizzBuzz'  
                    ]
                );
            });
        });
    });*/
});