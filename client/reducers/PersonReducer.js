import {
  CHANGE_SCORE
} from '../actions/PersonActions';
import Immutable from 'immutable';

export function person (state = {
  ids   : Immutable.List.of(1, 2, 3),
  infos : Immutable.Map({
    1 : Immutable.Map({
      name   : 'test name 1',
      scores : Immutable.Map({
        p1 : 1,
        p2 : 2,
        p3 : 3,
        p4 : 4
      })
    }),
    2 : Immutable.Map({
      name   : 'test name 2',
      scores : Immutable.Map({
        p1 : 2,
        p2 : 1,
        p3 : 4,
        p4 : 3
      })
    }),
    3 : Immutable.Map({
      name   : 'test name 3',
      scores : Immutable.Map({
        p1 : 4,
        p2 : 2,
        p3 : 1,
        p4 : 3
      })
    })
  })
}, action) {
  return state;
}
