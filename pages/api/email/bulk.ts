// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SendSmtpEmailMessageVersions } from "@sendinblue/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { connect } from "../../../utils/db";
import { sendEmail, sendEmailParams } from "../../../utils/email/send";
import { ResponseBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

const { VERCEL_URL, NEXT_PUBLIC_CALLBACK_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      const { Ticket, QR } = await connect();

      const allUnsentTickets = await Ticket.find({
        email_sent: false,
      });

      let versions: SendSmtpEmailMessageVersions[] = [];

      for (const item of allUnsentTickets) {
        const qr = await QR.findOne({
          ticket_id: item._id,
        });

        if (qr) {
          versions = [
            ...versions,
            {
              subject: "Algorhythms 2023",
              to: [{ email: item.email, name: item.name }],
              params: {
                bodyMessage: "Test Bulk",
                email: item.email,
                name: item.name,
                phone_number: item.phone_number,
                qr_url: `${VERCEL_URL || NEXT_PUBLIC_CALLBACK_URL}/api/qr/${
                  item._id
                }`,
                qr_data: Buffer.from(qr.data).toString("base64"),
              },
            },
          ];

          const updateTicket = {
            ...item.toObject(),
            email_sent: true,
          };

          await Ticket.updateOne({ _id: item.id }, updateTicket);
        }
      }

      const sibConfig: sendEmailParams = {
        subject: "Algorhythms 2023",
        messageVersions: versions,
      };

      const sib_email = await sendEmail(sibConfig);

      res.status(200).json({
        message: "Success",
        data: {
          sib_message_ids: sib_email.body,
        },
      });
    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}
