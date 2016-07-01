export const ADD_BUG_BASH = 'ADD_BUG_BASH';
export function addBugBash (data) {
  return {
    type    : ADD_BUG_BASH,
    content : data
  };
}

export const DEL_BUG_BASH = 'DEL_BUG_BASH';
export function delBugBash (data) {
  return {
    type    : DEL_BUG_BASH,
    content : data
  };
}
