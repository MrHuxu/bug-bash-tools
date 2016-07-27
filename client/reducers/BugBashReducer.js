import $ from 'jquery'
import {
  REFRESH_BUG_BASH,
  CHANGE_VERSION
} from '../actions/BugBashActions';

export function bugBash (state = {
  version : '6.10',
  ids     : [],
  infos   : {}
}, action) {
  const { type, content } = action;

  switch (type) {
    case CHANGE_VERSION:
      return $.extend({}, state, {
        version : content
      });

    case REFRESH_BUG_BASH:
      return $.extend({}, state, {
        ids   : (content || []).map(record => record.ID),
        infos : (content || []).reduce((prev, cur, index, arr) => {
          prev[arr[index].ID] = arr[index];
          return prev;
        }, {})
      });

    default:
      return state;
  }
}
