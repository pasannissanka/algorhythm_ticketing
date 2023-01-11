// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { connect, Ticket } from "../../../utils/db";
import { QRImage } from "../../../utils/db/models/qr.model";
import { sendEmail, sendEmailParams } from "../../../utils/email/send";
import { ResponseBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

type AggregateResult = Ticket & {
  qr: QRImage;
  idx: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      const { Ticket, QR } = await connect();

      const allUnsentTickets = await Ticket.aggregate<AggregateResult>([
        {
          $match: {
            email_sent: false,
          },
        },
        {
          $lookup: {
            from: "qrs",
            localField: "_id",
            foreignField: "ticket_id",
            as: "qr",
          },
        },
        {
          $unwind: {
            path: "$qr",
            includeArrayIndex: "idx",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      const sibConfig: sendEmailParams = {
        subject: "Test",
        messageVersions: allUnsentTickets.map((item) => {
          return {
            to: [{ email: item.email, name: item.name }],
            params: {
              bodyMessage: "Test Bulk",
              qr_url: Buffer.from(item.qr.data).toString("base64"),
            },
          };
        }),
      };

      

    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}
