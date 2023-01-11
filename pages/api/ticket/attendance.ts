// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/db";
import { ResponseBody, TicketReqBody } from "../../../utils/types";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      // handle get all tickets
      try {
        const { Ticket } = await connect();

        const attendantCount = await Ticket.find({
          status: "ATTENDED",
        }).count();
        res.status(200).json({ message: "Success", data: attendantCount });
      } catch (error) {
        res.status(400).json({ message: "Error", data: error });
      }
    } else {
      // not implemented
      res.status(404).json({ message: "Not found" });
    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}
