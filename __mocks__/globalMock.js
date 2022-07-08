/* eslint-disable no-undef */

jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
  useState: jest.fn(),
}));
jest.mock('mobx-session');
