import { CustomerRepositoryImpl } from "srv/repositories/customer/implementation";
import { ProductRepositoryImpl } from "srv/repositories/product/implementation";
import { SalesOrderHeaderServiceImpl } from "srv/services/sales-oreder-header/implementation";
import { SalesOrderHeaderService } from "srv/services/sales-oreder-header/protocols";
import { SalesOrderLogRepositoryImpl } from "srv/repositories/product/sales-order-log/implementation";

const makeSalesOrderHeaderService = (): SalesOrderHeaderService => {
    const customerRepository = new CustomerRepositoryImpl();
    const productRepository = new ProductRepositoryImpl();
    const salesOrderLogRepository = new SalesOrderLogRepositoryImpl();
    return new SalesOrderHeaderServiceImpl(customerRepository, productRepository, salesOrderLogRepository);

}

export const salesOrderHeaderService = makeSalesOrderHeaderService();