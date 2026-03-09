using sales from '../../db/schema';

type SalesReportByDays {
    date: Date;
    amount: Decimal;
};

// @requires: 'authenticated-user'

//Entities
service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    entity SalesOrderStatuses as projection on sales.SalesOrderStatuses;
    entity Customers as projection on sales.Customers;
    entity Products as projection on sales.Products;
    entity SalesOrderLogs as projection on sales.SalesOrderLogs;
    

}

//Functions
extend service MainService with {
     function getSalesReportByDays(days: Integer) returns array of SalesReportByDays;
}