import { CustomerRepositoryImpl } from '@/repositories/customer/implementation';
import { ProductRepositoryImpl } from '@/repositories/product/implementation';
import { SalesOrderHeaderServiceImpl } from '@/services/sales-oreder-header/implementation';
import { SalesOrderHeaderService } from '@/services/sales-oreder-header/protocols';
import { SalesOrderLogRepositoryImpl } from '@/repositories/sales-order-log/implementation';

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const salesOrderLogRepository = new SalesOrderLogRepositoryImpl();
    return new SalesOrderHeaderServiceImpl(customerRepository, productRepository, salesOrderLogRepository);
};

export const salesOrderHeaderService = makeSalesOrderHeaderService();
