import {expect} from 'chai';

import reducer, {dismissSnack, enqueueSnack} from './snacks';

describe('snack state', () => {
	describe('action creators', () => {
		describe('enqueueSnack', () => {
			it('creates a valid action', () => {
				const snack = {message: 'foo'};
				const action = enqueueSnack(snack);
				expect(action.type).to.equal('ENQUEUE_SNACK');
				expect(action.notification).to.contain(snack);
			});
		});

		describe('dismissSnack', () => {
			it('creates a valid action', () => {
				const action = dismissSnack(5);
				expect(action.type).to.equal('DISMISS_SNACK');
				expect(action.key).to.equal(5);
			});
		});
	});

	describe('reducer', () => {
		const initialState = [
			{message: 'foo', key: new Date().getTime() + Math.random()},
			{message: 'bar', key: new Date().getTime() + Math.random()}
		];
		Object.freeze(initialState);

		describe('ENQUEUE_SNACK', () => {
			it('adds the snack to the list', () => {
				const notification = {
					message: 'foobar',
					key: new Date().getTime() + Math.random()
				};
				const newState = reducer(initialState, {
					type: 'ENQUEUE_SNACK',
					notification
				});
				expect(newState).to.have.length(initialState.length + 1);
				expect(newState).to.contain(notification);
			});
		});

		describe('DISMISS_SNACK', () => {
			it('removes the snack from the list', () => {
				const key = initialState[0].key;
				const newState = reducer(initialState, {type: 'DISMISS_SNACK', key});
				expect(newState).to.have.length(initialState.length - 1);
				expect(newState).to.not.contain(initialState[0]);
			});

			it('does nothing if the snack is not in the list', () => {
				const newState = reducer(initialState, {
					type: 'DISMISS_SNACK',
					snack: new Error('not in list')
				});

				expect(newState).to.deep.equal(initialState);
			});
		});
	});
});
