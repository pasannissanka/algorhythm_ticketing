import { Document, Schema, Types } from "mongoose";

type QRImage = {
  data: Buffer;
  contentType?: string;
  ticket_id: any;
};

type QRImageMongoDoc = QRImage & Document;

const QrImageSchema = new Schema<QRImageMongoDoc>({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
  },
  ticket_id: {
    type: Types.ObjectId,
    required: true,
    ref: "Ticket",
  },
});

export { QrImageSchema };
export type { QRImage };
