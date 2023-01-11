// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Stream } from "stream";
import { connect, Ticket } from "../../../utils/db";
import { ResponseBody, TicketReqBody } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";
import QRCode from "qrcode";
import { Model } from "mongoose";
import { QRImage } from "../../../utils/db/models/qr.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      const { Ticket, QR } = await connect();
      const reqData = req.body as TicketReqBody[];
      const reqDataPromiseArr = reqData.map((item) =>
        promiseHandler(item, Ticket, QR)
      );
      const resolvedData = await Promise.allSettled(reqDataPromiseArr);
      const isAllFulfilled = resolvedData.every((p) => p.status === "fulfilled");

      if (isAllFulfilled) {
        res.status(200).json({ message: "Success", data: resolvedData });
      } else {
        res.status(401).json({ message: "Some Failed", data: resolvedData });
      }
    } else {
      res.status(404).json({ message: "Not Handled" });
    }
  } else {
    res.status(400).json({
      message: "Unauthorized",
    });
  }
}

const promiseHandler = async (
  item: TicketReqBody,
  Ticket: Model<Ticket, {}, {}, {}, any>,
  QR: Model<QRImage, {}, {}, {}, any>
) => {
  return new Promise<Ticket>(async (resolve, reject) => {
    try {
      const { email, name, phone_number, type, payment_status } = item;
      const ticket = await Ticket.create({
        email,
        name,
        phone_number,
        type,
        payment_status,
      });

      const id = ticket.id;

      const _buf: any[] = [];
      const writableStream = new Stream.Writable({
        write: function (chunk, encoding, next) {
          _buf.push(chunk);
          next();
        },
      });

      QRCode.toFileStream(writableStream, id, {
        width: 640,
        errorCorrectionLevel: "H",
      });

      writableStream.on("finish", async function () {
        await QR.create({
          contentType: "image/png",
          data: Buffer.concat(_buf),
          ticket_id: id,
        });

        resolve(ticket);
      });

      writableStream.on("error", function (err) {
        reject({ error: err, item });
      });
    } catch (error) {
      reject({ error, item });
    }
  });
};
