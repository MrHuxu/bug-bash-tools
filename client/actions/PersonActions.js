export const CHANGE_SCORE = 'CHANGE_SCORE';
export function changeScore (data) {
  return {
    type    : CHANGE_SCORE,
    content : data
  };
}
