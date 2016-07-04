import {
  REFRESH_MEMBER
} from '../actions/BugBashActions';

export function member (state = {
  names : [],
  infos : {}
}, action) {
  const { type, content } = action;

  switch (type) {
    case REFRESH_MEMBER:
      return {
        names : Object.keys(content),
        infos : content
      };

    default:
      return state;
  }
}
