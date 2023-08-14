import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { allUsersQuery } from "../../utils/queries";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
        const data = await client.fetch(allUsersQuery())

        if(data){
            res.status(200).json(data)
        }else {
            res.json([])
        }

    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
