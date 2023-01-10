//IMPORT MONGOOSE
import { Document, Schema, Types } from "mongoose";

type Ticket = {
  name: string;
  email: string;
  phone_number: string;
  type: "UNDERGRADUATE" | "ALUMIN";
  // statuses
  email_sent: boolean;
  status: "NOT_ATTENDED" | "ATTENDED";
  payment_status: "FULL_PAID" | "HALF_PAID" | "NOT_PAID";
};

type TicketMongoDoc = Ticket & Document;

const TicketSchema = new Schema<TicketMongoDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  email_sent: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: false,
    enum: ["ATTENDED", "NOT_ATTENDED"],
    default: "NOT_ATTENDED",
  },
  payment_status: {
    type: String,
    required: true,
    enum: ["FULL_PAID", "HALF_PAID", "NOT_PAID"],
    default: "NOT_PAID",
  },
});

export { TicketSchema };
export type { Ticket };
