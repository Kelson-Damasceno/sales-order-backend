// db/types/sales-report-by-days.cds

using { sales } from '../schema';

namespace db.types.SalesReport;  

type ExpectedResult {
    SalesOrderId          : sales.SalesOrderHeaders:id;           // <── Um só :
    SalesOrderTotalAmount : sales.SalesOrderHeaders:totalAmount;  // <── Um só :
    customerId            : sales.Customers:id;                   // <── Um só :
    customerFullName      : String(120);
}

type Params {
    days: Integer; 
}