import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const query = allPostsQuery();
      const data = await client.fetch(query);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }else if(req.method === 'POST'){
    const document = req.body

    client.create(document)
      .then(() => res.status(201).json('video created'))
  }
  
  
  else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
