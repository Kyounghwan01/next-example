import { openDB } from "../openDB";

export interface Make {
  make: string;
  count: number;
}

export async function getMakes() {
  const db = await openDB();
  // 몇개의 차를 등록할지
  const makes = await db.all<Make[]>(`
        SELECT make, count(*) as count
        FROM car
        GROUP BY make
    `);
  return makes;
}
