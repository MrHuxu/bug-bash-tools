import $ from 'jquery';

var fetchAllBugBash = () {
  $.get('/bug-bash/', (a, b, c) => {
    console.log(a, b, c);
  });
}

export const ADD_BUG_BASH = 'ADD_BUG_BASH';
export function addBugBash (data) {
  return function (dispatch) {
    $.post('/bug-bash/new', data, (a, b, c) => {
      dispatch(fetchAllBugBash());
    })
  }
  return {
    type    : ADD_BUG_BASH,
    content : data
  };
}

export const UPD_BUG_BASH = 'UPD_BUG_BASH';
export function updBugBash (data) {
  return {
    type    : UPD_BUG_BASH,
    content : data
  };
}

export const DEL_BUG_BASH = 'DEL_BUG_BASH';
export function delBugBash (data) {
  return {
    type    : DEL_BUG_BASH,
    content : data.id
  };
}
