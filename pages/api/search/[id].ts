import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { searchPostsQuery } from "../../../utils/queries";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const {searchTerm}: any = req.query
      const videosQuery = searchPostsQuery(searchTerm)
      const videos = await client.fetch(videosQuery)
     res.status(200).json(videos)

    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
