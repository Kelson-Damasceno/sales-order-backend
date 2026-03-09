import cds from '@sap/cds';

import { ExpectedResult as SalesReportByDays }
        from '../../@cds-models/db/types/SalesReportByDays';

import { SalesReportModel } from "@/models/sales-report-by-days";
import { SalesReportRepository } from "@/repositories/sales-report/protocols";


export class SalesReportRepositoryImpl implements SalesReportRepository {
    public async findByDays(days: number): Promise<SalesReportModel[] | null> {
        const today = new Date().toISOString();
        const subtractedDays = new Date();
        subtractedDays.setDate(subtractedDays.getDate() - days);
        const subtractedDaysISOString = subtractedDays.toISOString();

        const sql = cds.SELECT.from('sales.SalesOrderHeaders')
        .columns(
            'id as salesOrderId', 
            'totalAmount as salesOrderTotalAmount', 
            'customer.id as customerId',
            //eslint-disable-next-line quotes
            `Customer.firstName || ' ' || customer.lastName as customer.FullName`
            
         )
        .where({ createdAt: {between: subtractedDaysISOString, and: today} });
        
        const salesReports = await cds.run(sql);
        if (salesReports.length === 0) {
                    return null;
                }
                return salesReports.map((salesReport: SalesReportByDays) =>
                  SalesReportModel.with({
                        salesOrderId: salesReport.SalesOrderId as string,
                        salesOrderTotalAmount: salesReport.SalesOrderTotalAmount as number,
                        customerId: salesReport.customerId as string,
                        customerFullName: salesReport.customerFullName as string  
                    })
                );
        
    
    }

}