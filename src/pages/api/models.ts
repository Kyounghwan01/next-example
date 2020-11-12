import { NextApiRequest, NextApiResponse } from "next";
import { getModels } from "../../database/getModels";
import { getAsString } from "../../getAsString";

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getAsString(req.query.make);
  console.log(make);
  const models = await getModels(make);
  console.log(models);
  res.json(models);
}
