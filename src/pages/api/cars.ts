import { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedCars } from "../../database/getPaginatedCars";

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.query); -> {page: 2}
  const cars = await getPaginatedCars(req.query);
  res.json(cars);
}
