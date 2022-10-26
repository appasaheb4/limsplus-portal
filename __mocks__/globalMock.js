/* eslint-disable no-undef */

jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
  useState: jest.fn(),
}));
jest.mock('@/library/assets/css/accordion.css', () => '');
jest.mock('@/library/components/organisms/style.css', () => '');
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
