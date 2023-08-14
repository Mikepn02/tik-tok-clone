import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "../../../utils/queries";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
        const {id} : any = req.query
        const query = singleUserQuery(id)
        const userVideosQuery = userCreatedPostsQuery(id)
        const userLikeVideosQuery = userLikedPostsQuery(id)
        const user = await client.fetch(query)
        const userVideos = await client.fetch(userVideosQuery)
        const userLikedVideos = await client.fetch(userLikeVideosQuery)
        res.status(200).json({user : user[0] , userVideos ,  userLikedVideos})

    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
