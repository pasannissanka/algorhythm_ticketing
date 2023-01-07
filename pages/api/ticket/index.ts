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
    if (req.method === "POST") {
      // handle ticket add
      try {
        const { Ticket } = await connect();
        const { email, name, phone_number, type } = req.body as TicketReqBody;

        const ticket = await Ticket.create({
          email,
          name,
          phone_number,
          type,
        });
        res.status(200).json({ message: "Success", data: ticket });
      } catch (error: any) {
        res.status(400).json({ message: "Error", data: error });
      }
    } else if (req.method === "GET") {
      // handle get all tickets
      try {
        const { Ticket } = await connect();

        const allTickets = await Ticket.find({});
        res.status(200).json({ message: "Success", data: allTickets });
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
