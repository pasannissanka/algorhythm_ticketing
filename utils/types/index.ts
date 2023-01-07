export interface TicketReqBody {
  name: string;
  email: string;
  phone_number: string;
  type: "UNDERGRADUATE" | "ALUMIN";
}


export type ResponseBody = {
  message: string;
  data?: any;
};