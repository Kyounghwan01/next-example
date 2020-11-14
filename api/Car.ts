/** 서버 api를 통해 들어오는 res에 대한 타입 정의 */
export interface CarModel {
  id: number;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  kilometers: number;
  details: string;
  price: number;
  photoUrl: string;
}
