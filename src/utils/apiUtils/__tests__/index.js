import { mockResponse, activity } from '../../testUtils';
import { login, logout } from '../../../actions/accountActions';
import { getNotes } from '../../../actions/noteActions';
import api from '../';
import store from '../../storeUtils';

test('token required error', () => {
  mockResponse({ status: 403 });
  store.dispatch(login({}));
  jest.runAllTimers();
  expect(activity.error).toBeCalled();
});

test('login success', () => {
  store.dispatch(login({ username: 'john', password: '1234' }));
  jest.runAllTimers();
  expect(activity.success).toBeCalled();
  expect(activity.error).not.toBeCalled();
});

test('token expired error', () => {
  mockResponse({ status: 403 });
  store.dispatch(getNotes());
  jest.runAllTimers();
  expect(activity.error).toBeCalled();
});

test('simple api error', () => {
  mockResponse({ status: 400 });
  store.dispatch({ api: { url: 'ANY_URL' } });
  jest.runAllTimers();
});

test('logout in the middle of request', () => {
  store.dispatch(login({ username: 'john', password: '1234' }));
  jest.runAllTimers();

  let error;
  store.dispatch({ api: { url: 'ANY_URL' } }).catch(err => (error = err));
  store.dispatch(logout());
  jest.runAllTimers();
  expect(error).toEqual('User logged out.');
});