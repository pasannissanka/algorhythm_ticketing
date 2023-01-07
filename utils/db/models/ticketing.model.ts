//IMPORT MONGOOSE
import { Document, Schema } from "mongoose";

type Ticket = {
  name: string;
  email: string;
  phone_number: string;
  type: "UNDERGRADUATE" | "ALUMIN";

  // statuses
  paid: boolean;
  email_sent: boolean;
  status: "NOT_ATTENDED" | "ATTENDED";
} & Document;

const TicketSchema = new Schema<Ticket>({
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
  paid: {
    type: Boolean,
    default: false,
  },
  email_sent: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: false,
    default: "NOT_ATTENDED"
  },
});

export { TicketSchema };
export type { Ticket };
