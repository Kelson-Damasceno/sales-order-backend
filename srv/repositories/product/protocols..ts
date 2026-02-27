import { ProductModel, ProductProps } from '@/models/product';

export interface ProductRepository {
    findByIds(ids: string[]): Promise<ProductModel[] | null>;
    updateStock(product: ProductModel): Promise<void>;
}
