import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { connect } from "../../../utils/db";
import { ResponseBody, TicketReqBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = req.query;
  const { attendance } = req.body;
  const { Ticket } = await connect();

  if (session) {
    if (req.method === "GET") {
      // Get ticket by id
      try {
        const ticket = await Ticket.findById(id);

        res.status(200).json({ message: "Success", data: ticket });
      } catch (error) {
        res.status(400).json({ message: "Error", data: error });
      }
    } else if (req.method === "PUT") {
      try {
        const ticket = await Ticket.findById(id);
        const updated = {
          ...ticket?.toObject(),
          status: attendance,
        };
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updated, {
          new: true,
        });
        res.status(200).json({ message: "Success", data: updatedTicket });
      } catch (error) {
        res.status(400).json({ message: "Error", data: error });
      }
      // mark ticket as attended
    } else if (req.method === "PATCH") {
      try {
        const { email, name, phone_number, type, payment_status } =
          req.body as TicketReqBody;

        const updated = {
          email,
          name,
          phone_number,
          type,
          payment_status,
        };

        const updatedTicket = await Ticket.findByIdAndUpdate(id, updated, {
          new: true,
        });
        res.status(200).json({ message: "Success", data: updatedTicket });
      } catch (error) {
        res.status(400).json({ message: "Error", data: error });
      }
    } else if (req.method === "DELETE") {
      // delete ticket
      try {
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        res.status(200).json({ message: "Success", data: deletedTicket });
      } catch (error) {
        res.status(400).json({ message: "Error", data: error });
      }
    }
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
}
