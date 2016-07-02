import {
  ADD_BUG_BASH,
  UPD_BUG_BASH,
  DEL_BUG_BASH
} from '../actions/BugBashActions';
import Immutable from 'immutable';

export function bugBash (state = Immutable.Map({
  ids   : Immutable.List.of(1),
  infos : Immutable.Map({
    1 : Immutable.Map({
      name      : 'test bug bash',
      ticket    : 'INK-3051',
      startTime : '2016-3-12 12:12',
      endTime   : '2016-3-12 14:12'
    })
  })
}), action) {
  const { type, content } = action;

  switch (type) {
    case ADD_BUG_BASH:
      var id = parseInt(Math.random() * 1000);
      state = state.set('ids', state.get('ids').push(id))
                   .setIn(['infos', id.toString()], content);
      return state;

    case DEL_BUG_BASH:
      var ids = state.get('ids');
      var infos = state.get('infos');
      state = state.set('ids', ids.delete(ids.indexOf(content)))
                   .set('infos', infos.delete(content.toString()));
      return state;

    case UPD_BUG_BASH:
      state = state.setIn(['infos', content.id.toString()], content.info);
      return state;

    default:
      return state;
  }
}
