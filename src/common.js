import moment from "moment";
import "moment/locale/ko"; // Import Korean locale

export function timeFromNow(dateString) {
  // timeFromNow 함수는 주어진 날짜 문자열을 받아서
  // 현재 시간과 비교한 결과를 반환합니다. 예를 들어 "1일 전", "2시간 전", "3분 전"
  // 등의 형식으로 반환됩니다.
  moment.locale("ko"); // Set locale to Korean
  const date = moment(dateString);
  return date.fromNow();
}
