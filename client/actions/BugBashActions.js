import $ from 'jquery';

export const REFRESH_BUG_BASH = 'REFRESH_BUG_BASH';
export function refreshBugBash (data) {
  return {
    type    : REFRESH_BUG_BASH,
    content : data
  };
}

export function fetchBugBash (condition) {
  return (dispatch) => {
    $.get('/bug-bash/', condition, (data, textStatus, jqXHR) => {
      dispatch(refreshBugBash(data.records));
    });
  };
}

export const ADD_BUG_BASH = 'ADD_BUG_BASH';
export function addBugBash (data) {
  return function (dispatch) {
    $.post('/bug-bash/new', data.info, (result, textStatus, jqXHR) => {
      if (data.info.version === data.currentVersion) {
        dispatch(fetchBugBash({ version: data.currentVersion }));
      }
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
        dispatch(fetchBugBash({ version: data.currentVersion }));
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
        dispatch(fetchBugBash({ version: data.version }));
      }
    });
  };
}

export const CHANGE_VERSION = 'CHANGE_VERSION';
export function changeVersion (data) {
  return {
    type    : CHANGE_VERSION,
    content : data
  };
}
