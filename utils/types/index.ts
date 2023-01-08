export interface TicketReqBody {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  type: "UNDERGRADUATE" | "ALUMIN";
  payment_status: "FULL_PAID" | "HALF_PAID" | "NOT_PAID";
  status: "NOT_ATTENDED" | "ATTENDED";
}

export type ResponseBody = {
  message: string;
  data?: any;
};

export type Alert = {
  show: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
};
