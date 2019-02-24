export class Customer {
  constructor(public id: number, public name: string, public phone: number) {}
}

export interface ICustomerResponse {
  total: number;
  data: Customer[];
}
