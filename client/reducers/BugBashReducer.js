import {
  REFRESH_BUG_BASH
} from '../actions/BugBashActions';
import Immutable from 'immutable';

export function bugBash (state = {
  ids   : [],
  infos : {}
}, action) {
  const { type, content } = action;

  switch (type) {
    case REFRESH_BUG_BASH:
      var ids = content.map(record => record._id);
      var infos = {};
      content.forEach(record => infos[record._id] = record);
      return {
        ids: ids,
        infos: infos
      }

    default:
      return state;
  }
}
