// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { connect } from "../../../utils/db";
import { sendEmail } from "../../../utils/email/send";
import { ResponseBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    const { Ticket, QR } = await connect();
    if (req.method === "POST") {
      const { ticket_id } = req.body;

      const ticket = await Ticket.findOne({
        _id: ticket_id,
      });

      if (ticket && !ticket.email_sent) {
        const qr = await QR.findOne({
          ticket_id: ticket.id,
        });

        if (qr) {
          const { email, name, id } = ticket;
          const sib_email = await sendEmail({
            subject: "Test",
            to: [{ email, name }],
            params: {
              bodyMessage: "Test",
              qr_url: Buffer.from(qr.data).toString("base64"),
            },
            attachment: [
              {
                name: "QR code.png",
                content: Buffer.from(qr.data).toString("base64"),
              },
            ],
          });

          if (sib_email) {
            const updateTicket = {
              ...ticket.toObject(),
              email_sent: true,
            };

            await Ticket.updateOne({ _id: ticket.id }, updateTicket);

            res.status(404).json({
              message: "Success",
            });
          } else {
            res.status(400).json({
              message: "Error",
            });
          }
        } else {
          res.status(404).json({
            message: "Not Found",
          });
        }
      } else {
        res.status(201).json({
          message: "Email sent already",
        });
      }
    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}
