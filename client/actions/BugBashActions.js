import $ from 'jquery';
import NProgress from 'nprogress';

export const REFRESH_MEMBER = 'REFRESH_MEMBER';
export function refreshMember (data) {
  NProgress.done();
  return {
    type    : REFRESH_MEMBER,
    content : data
  };
}

export function fetchAllMember (ids) {
  NProgress.start();
  return (dispatch) => {
    NProgress.set(0.4);
    $.post('/member/', { ids: ids }, (data, textStatus, jqXHR) => {
      NProgress.set(0.8);
      dispatch(refreshMember(data));
    });
  };
}

export const REFRESH_BUG_BASH = 'REFRESH_BUG_BASH';
export function refreshBugBash (data) {
  return {
    type    : REFRESH_BUG_BASH,
    content : data
  };
}

export function fetchAllBugBash () {
  return (dispatch) => {
    $.get('/bug-bash/', (data, textStatus, jqXHR) => {
      dispatch(refreshBugBash(data.records));
    });
  };
}

export const ADD_BUG_BASH = 'ADD_BUG_BASH';
export function addBugBash (data) {
  return function (dispatch) {
    $.post('/bug-bash/new', data, (data, textStatus, jqXHR) => {
      dispatch(fetchAllBugBash());
    });
  };
}

export const UPD_BUG_BASH = 'UPD_BUG_BASH';
export function updBugBash (data) {
  return function (dispatch) {
    $.ajax({
      url     : '/bug-bash/update',
      type    : 'PUT',
      data    : data,
      success : function (result) {
        dispatch(fetchAllBugBash());
      }
    });
  };
}

export const DEL_BUG_BASH = 'DEL_BUG_BASH';
export function delBugBash (data) {
  return function (dispatch) {
    $.ajax({
      url     : '/bug-bash/destroy',
      type    : 'DELETE',
      data    : data,
      success : function (result) {
        dispatch(fetchAllBugBash());
      }
    });
  };
}
