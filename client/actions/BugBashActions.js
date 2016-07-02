export const ADD_BUG_BASH = 'ADD_BUG_BASH';
export function addBugBash (data) {
  console.log(data);
  return {
    type    : ADD_BUG_BASH,
    content : data
  };
}

export const UPD_BUG_BASH = 'UPD_BUG_BASH';
export function updBugBash (data) {
  console.log(data);
  return {
    type    : UPD_BUG_BASH,
    content : data
  };
}

export const DEL_BUG_BASH = 'DEL_BUG_BASH';
export function delBugBash (id) {
  return {
    type    : DEL_BUG_BASH,
    content : id
  };
}
