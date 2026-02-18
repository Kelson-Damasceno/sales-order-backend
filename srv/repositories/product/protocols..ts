import { ProductModel, ProductProps } from "srv/models/product";

 export interface ProductRepository {
    findByIds(ids: string[] ): Promise<ProductModel[] | null>
 }