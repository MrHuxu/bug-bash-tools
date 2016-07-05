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

export function fetchMembers (bugBashIds) {
  NProgress.start();
  return (dispatch) => {
    NProgress.set(0.4);
    $.post('/member/', { ids: bugBashIds }, (data, textStatus, jqXHR) => {
      NProgress.set(0.8);
      dispatch(refreshMember(data));
    });
  };
}
