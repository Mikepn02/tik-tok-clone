import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
     const user = req.body
     
    await client.createIfNotExists(user)
     res.status(200).json({message: "Loggin success"})

    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
