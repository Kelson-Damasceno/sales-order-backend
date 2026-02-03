import cds, { Request, Service } from '@sap/cds';
import { Customers, Product, Products, SalesOrderHeaders, SalesOrderItem, SalesOrderItems } from '@cds-models/sales';
import { request } from 'axios';
import { CustomerServiceImpl } from './services/customer/implementation';




export default (service: Service) => {
    service.before(['READ', 'WRITE'], '*', (request: Request) => {
        if(!request.user.is('user')) {
            return request.reject(403, 'Não valido');
        }
    });
    service.after('READ', 'Customers', (results: Customers) => {
        const service = new CustomerServiceImpl();
        service.afterRead(results); 
        // results.forEach(customer => {
        //     if (!customer.email?.includes('@')){
        //         customer.email = `${customer.email}@gmail.com`; 
        //     }
        // })
    });
    service.before('CREATE', 'SalesOrderHeaders', async (request: Request) => {
        const params = request.data;
        const items: SalesOrderItem [] = params.items;
        if (!params.customer_id){
            return request.reject(400, 'Customer inavalido');
        }

        if (!params.items || params.items?.length === 0){
            return request.reject(400, 'Itens invalidos')
        }

        const customerQuery = SELECT.one.from('sales.Customers').where({id: params.customer_id});
        const customer = await cds.run(customerQuery);

        if (!customer){
            return request.reject(404, 'Customer não encontrado');
        }

        const productsIds: string [] = params.items.map((item: SalesOrderItem) => item.product_id);
        const productsQuery = SELECT.from('sales.Products').where({id: productsIds})
        const products: Products = await cds.run(productsQuery);
        for (const item of items){
            const dbProduct = products.find(product => product.id === item.product_id);
            if(!dbProduct){
            return request.reject(404, `Produto ${item.product_id} não encontrado`);
        }
            if (dbProduct.stock === 0){
            return request.reject(400, `Produto ${dbProduct.name} sem estoque disponivel`);
        }
        }
        let totalAmount = 0;
        items.forEach(item =>{
            totalAmount =+ (item.price as number) * (item.quantity as number);
        })
        console.log(`Antes do desconto ${totalAmount}`);
        if(totalAmount > 30000){
            totalAmount = totalAmount - (totalAmount * (10/100));
        }
        console.log(`Depois do desconto ${totalAmount}`);
        request.data.totalAmount = totalAmount;
    });

    service.after('CREATE', 'SalesOrderHeaders', async (results: SalesOrderHeaders, request: Request) => {
        const headersAsArray = Array.isArray(results) ? results : [results] as SalesOrderHeaders;
        for (const header of headersAsArray){
            const items = header.items as SalesOrderItems;
            const productsData = items.map(item => ({
                id: item.product_id as string,
                quantity: item.quantity as number 
            }));
            const productsIds: string [] = productsData.map((productsData) => productsData.id);
            const productsQuery = SELECT.from('sales.Products').where({id: productsIds})
            const products: Products = await cds.run(productsQuery);
            for(const productData of productsData){
                const foundProduct = products.find(product => product.id === productData.id) as Product;
                foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
                await cds.update('sales.Products').where({id: foundProduct.id}).with({stock: foundProduct.stock});
            }
            const headersAsString = JSON.stringify(header);
            const userAsString = JSON.stringify(request.user);
            const log = [{
                header_id: header.id,
                userDate: userAsString,
                orderData: headersAsString  
            }];
             await cds.create('sales.SalesOrderLogs').entries(log)
        }
       
    })
}