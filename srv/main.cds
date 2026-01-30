using sales from '../db/schema';



service MainService {

    @requires: ['admin']
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders;

    @requires: ['admin']
    entity Customers as projection on sales.Customers;
    
    @requires: ['user']
    entity Products as projection on sales.Products;
}