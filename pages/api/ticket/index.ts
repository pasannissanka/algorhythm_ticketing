// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/db";
import { ResponseBody, TicketReqBody } from "../../../utils/types";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import QRCode from "qrcode";
import { Stream } from "stream";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../utils/firebaseConfig";

const metadata = {
  contentType: "image/png",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      // handle ticket add
      try {
        const { Ticket, QR } = await connect();
        const { email, name, phone_number, type, payment_status } =
          req.body as TicketReqBody;

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
          const storageRef = ref(storage, `image/${id}.png`);

          const snapshot = await uploadBytes(
            storageRef,
            Buffer.concat(_buf),
            metadata
          );

          const url = await getDownloadURL(snapshot.ref);

          console.log("****", url);

          await QR.create({
            contentType: "image/png",
            data: Buffer.concat(_buf),
            ticket_id: id,
            image_url: url,
          });

          res.status(200).json({ message: "Success", data: ticket });
        });

        writableStream.on("error", function (err) {
          res.status(400).json({ message: "Error", data: err });
        });
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
