import cds, { Request, Service } from '@sap/cds';
import { Customers, Product, Products, SalesOrderHeaders, SalesOrderItem, SalesOrderItems } from '@cds-models/sales';
import { request } from 'axios';
import { customerController } from './factories/controller/customer';
import { salesOrderHeaderController } from './factories/controller/sales-order-header';
import { FullRequestParams } from './protocols';

export default (service: Service) => {
    service.after('READ', 'Customers', (customerList: Customers, request) => {
        console.log(request);

        (request as unknown as FullRequestParams<Customers>).results = customerController.afterRead(customerList);

        // results.forEach(customer => {
        //     if (!customer.email?.includes('@')){
        //         customer.email = `${customer.email}@gmail.com`;
        //     }
        // })
    });
    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        const result = await salesOrderHeaderController.beforeCreate(params);
        if (result.hasError) {
            return request.reject(400, result.error?.message as string);
        }
        // const items: SalesOrderItem [] = params.items;
        // if (!params.customer_id){
        //     return request.reject(400, 'Customer inavalido');
        // }

        // if (!params.items || params.items?.length === 0){
        //     return request.reject(400, 'Itens invalidos')
        // }

        // const customerQuery = SELECT.one.from('sales.Customers').where({id: params.customer_id});
        // const customer = await cds.run(customerQuery);

        // if (!customer){
        //     return request.reject(404, 'Customer não encontrado');
        // }

        // const productsIds: string [] = params.items.map((item: SalesOrderItem) => item.product_id);
        // const productsQuery = SELECT.from('sales.Products').where({id: productsIds})
        // const products: Products = await cds.run(productsQuery);
        // for (const item of items){
        //     const dbProduct = products.find(product => product.id === item.product_id);
        //     if(!dbProduct){
        //     return request.reject(404, `Produto ${item.product_id} não encontrado`);
        // }
        //     if (dbProduct.stock === 0){
        //     return request.reject(400, `Produto ${dbProduct.name} sem estoque disponivel`);
        // }
        // }
        // let totalAmount = 0;
        // items.forEach(item =>{
        //     totalAmount =+ (item.price as number) * (item.quantity as number);
        // })
        console.log(`Antes do desconto ${result.totalAmount}`);
        // if(totalAmount > 30000){
        //     const discount = totalAmount * (10/100)
        //     totalAmount = totalAmount - discount;
        // }
        console.log(`Depois do desconto ${result.totalAmount}`);
        request.data.totalAmount = result.totalAmount;
    });

    service.after('CREATE', 'SalesOrderHeaders', async (salesOrderHeaders: SalesOrderHeaders, request: Request) => {
        await salesOrderHeaderController.afterCreate(salesOrderHeaders[0], request.user);
    });
};
