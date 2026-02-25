import { Customers } from '@cds-models/sales';

export interface CustomerService {
    afterRead(costumerList: Customers): Customers;
}
