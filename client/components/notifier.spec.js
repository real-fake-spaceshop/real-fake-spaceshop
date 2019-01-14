import React from 'react';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Notifier} from './notifier';

chai.use(sinonChai);

const adapter = new Adapter();
enzyme.configure({adapter});

const snacks = [
	{message: 'test1'},
	{message: 'test2'},
	{message: 'error!', options: {variant: 'error'}}
];

describe('Notifier', () => {
	let wrapper;
	const enqueueSnackbar = sinon.spy();
	const removeSnack = sinon.spy();

	beforeEach('Reset spies', () => {
		enqueueSnackbar.resetHistory();
		removeSnack.resetHistory();
	});

	beforeEach('create component', () => {
		snacks.forEach(snack => {
			snack.key = new Date().getTime() + Math.random();
		});
		wrapper = shallow(
			<Notifier
				snacks={snacks}
				enqueueSnackbar={enqueueSnackbar}
				removeSnack={removeSnack}
			/>
		);
	});

	it('calls enqueueSnackbar for each snack', () => {
		expect(enqueueSnackbar).to.have.callCount(snacks.length);
	});

	it('calls removeSnack for each snack it displays', () => {
		expect(removeSnack).to.have.callCount(snacks.length);
	});

	it("doesn't display the same snack more than once", () => {
		expect(enqueueSnackbar).to.have.callCount(snacks.length);
		wrapper.update();
		expect(enqueueSnackbar).to.have.callCount(snacks.length);
	});
});
