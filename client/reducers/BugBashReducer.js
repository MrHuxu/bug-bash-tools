import {
  ADD_BUG_BASH,
  DEL_BUG_BASH
} from '../actions/BugBashActions';
import Immutable from 'immutable';

export function bugBash (state = Immutable.Map({
  ids   : Immutable.List.of(1),
  infos : Immutable.Map({
    1 : Immutable.Map({
      name : 'test bug bash',
      info : Immutable.Map({
        startTime : '2016-3-12 12:12',
        startTime : '2016-3-12 14:12'
      })
    })
  })
}), action) {
  const { type, content } = action;
  return state;
}
