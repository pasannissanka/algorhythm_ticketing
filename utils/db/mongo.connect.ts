import mongoose from "mongoose";
import { Ticket, TicketSchema } from "./models/ticketing.model";
import { QRImage, QrImageSchema } from "./models/qr.model";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  const Ticket: mongoose.Model<Ticket> =
    mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
  const QR: mongoose.Model<QRImage> =
    mongoose.models.QR || mongoose.model("QR", QrImageSchema);

  return { conn, Ticket, QR };
};
