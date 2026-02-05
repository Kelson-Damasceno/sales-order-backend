// entity Products {
//    key id: UUID;
//       name: String(255);
//       price: Decimal(15,2);
//       stock: Integer;
// }


export type ProductProps = {
    id: string,
    name: string,
    price: number,
    stock: number 
};

export class ProductModel {
    constructor(private props: ProductProps){}
        
        public static with(props: ProductProps){
            return new ProductModel(props);
        }

        public   get id(){
            return this.props.id
        }

        public   get name(){
            return this.props.name
        }

        public   get price(){
            return this.props.price
        }

        public   get stock(){
            return this.props.stock
        }
    
}
