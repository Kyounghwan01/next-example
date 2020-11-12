import { HelpOutline } from "@material-ui/icons";

export function getAsString(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
// 동일한 값의 파람이 2개 나올경우 [1, 2]이렇게 들어감으로 앞 값만 쓰도록 핸들링해줌
