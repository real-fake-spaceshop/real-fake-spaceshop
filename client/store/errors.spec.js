import {expect} from 'chai';

import reducer, {dismissError, enqueueError} from './errors';

describe.only('error state', () => {
	describe('action creators', () => {
		describe('enqueueError', () => {
			it('creates a valid action', () => {
				const error = new Error('Test error');
				const action = enqueueError(error);
				expect(action.type).to.equal('ENQUEUE_ERROR');
				expect(action.error).to.equal(error);
			});
		});

		describe('dismissError', () => {
			it('creates a valid action', () => {
				const error = new Error('Test error');
				const action = dismissError(error);
				expect(action.type).to.equal('DISMISS_ERROR');
				expect(action.error).to.equal(error);
			});
		});
	});

	describe('reducer', () => {
		const initialState = [new Error('Test1'), new Error('Test2')];
		Object.freeze(initialState);

		describe('ENQUEUE_ERROR', () => {
			it('adds the error to the list', () => {
				const error = new Error('test enqueue');
				const newState = reducer(initialState, {type: 'ENQUEUE_ERROR', error});
				expect(newState).to.have.length(initialState.length + 1);
				expect(newState).to.contain(error);
			});
		});

		describe('DISMISS_ERROR', () => {
			it('removes the error from the list', () => {
				const error = initialState[0];
				const newState = reducer(initialState, {type: 'DISMISS_ERROR', error});
				expect(newState).to.have.length(initialState.length - 1);
				expect(newState).to.not.contain(error);
			});

			it('does nothing if the error is not in the list', () => {
				const newState = reducer(initialState, {
					type: 'DISMISS_ERROR',
					error: new Error('not in list')
				});

				expect(newState).to.equal(initialState);
			});
		});
	});
});
