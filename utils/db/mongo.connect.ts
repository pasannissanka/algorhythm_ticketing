import mongoose from "mongoose";
import { Ticket, TicketSchema } from "./models/ticketing.model";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  const Ticket: mongoose.Model<Ticket> = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);

  return { conn, Ticket };
};
