// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { ticket_id } = req.query;

  const { QR } = await connect();

  const qr = await QR.findOne({
    ticket_id: ticket_id,
  });

  if (qr) {
    const imgData = Buffer.from(qr.data).toString("base64");
    res.writeHead(200, [["Content-Type", "image/png"]]);
    res.end(Buffer.from(imgData, "base64"));
  } else {
    res.status(400).json({
      message: "Not found",
    });
  }
}
