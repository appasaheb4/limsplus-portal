/* eslint-disable */
import {combineReducers} from 'redux';

import sidebar from './sidebar-reducers';
import layout from './layout-reducer';
import theme from './theme-reducer';

import {reducer as toastr} from 'react-redux-toastr';

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
});
