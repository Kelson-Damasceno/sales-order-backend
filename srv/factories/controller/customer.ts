import { CustomerControllerImpl } from '@/controllers/customer/implementation';
import { CustomerController } from 'srv/controllers/customer/protocols';
import { customerService } from '@/factories/services/customer';

const makeCustomerController = (): CustomerController => {
    return new CustomerControllerImpl(customerService);
};

export const customerController = makeCustomerController();
