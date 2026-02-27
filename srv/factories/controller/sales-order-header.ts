import { SalesOrderHeaderControllerImpl } from '@/controllers/sales-order-header/implementation';
import { SalesOrderHeaderController } from '@/controllers/sales-order-header/protocols';
import { salesOrderHeaderService } from '@/factories/services/sales-order-header';

export const makeSalesOrderHeaderController = (): SalesOrderHeaderController => {
    return new SalesOrderHeaderControllerImpl(salesOrderHeaderService);
};

export const salesOrderHeaderController = makeSalesOrderHeaderController();
