//IMPORT MONGOOSE
import { Document, Schema, Types } from "mongoose";
import { AttendanceStatus, PaymentStatus, TicketType } from "../../types";

type Ticket = {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  type: TicketType;
  // statuses
  email_sent: boolean;
  status: AttendanceStatus;
  payment_status: PaymentStatus;
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
    required: false,
  },
  type: {
    type: String,
    enum: ["UNDERGRADUATE", "ALUMNI", "VIP"],
    required: true,
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
    required: false,
    enum: ["FULL_PAID", "HALF_PAID", "NOT_PAID"],
    default: "NOT_PAID",
  },
});

export { TicketSchema };
export type { Ticket };
