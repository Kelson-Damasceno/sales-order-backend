using sales from '../db/schema';


service MainService {

    @restrict: [
        
        {
            grant: ['READ', 'WRITE'],
            to: 'admin'
        }
    ]
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;
    
    @restrict: [
    {
            grant: 'READ',
            to: 'user'
        }
    ]
    entity Customers as projection on sales.Customers;

    entity Products as projection on sales.Products;
}