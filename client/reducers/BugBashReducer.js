import {
  REFRESH_BUG_BASH
} from '../actions/BugBashActions';

export function bugBash (state = {
  ids   : [],
  infos : {}
}, action) {
  const { type, content } = action;

  switch (type) {
    case REFRESH_BUG_BASH:
      return {
        ids   : content.map(record => record._id),
        infos : content.reduce((prev, cur, index, arr) => {
          prev[arr[index]._id] = arr[index];
          return prev;
        }, {})
      };

    default:
      return state;
  }
}
