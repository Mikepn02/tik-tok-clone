import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
        const {userId , postId , like} = req.body;
        const data =
        like ? await client
        .patch(postId)
        .setIfMissing({likes:[]})
        .insert('after','likes[-1]',[{
            _key:uuid(),
            _ref: userId
        }])
        .commit()
        : await client
        .patch(postId)
        .unset([`likes[_ref== "${userId}"]`])
        .commit()

        res.status(200).json(data)
    } catch (error) {
      console.error("Error fetching data from Sanity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
