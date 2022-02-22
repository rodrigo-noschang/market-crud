import { IProductDB, IProductRequest } from "../types/datastypes"
import { Product } from "../entities"
import { getRepository } from "typeorm"

export const createProductService = async (productData: IProductRequest) => {
    const productRepository = getRepository(Product);
    const newProduct = productRepository.create(productData);
    await productRepository.save(newProduct);

    return newProduct;
}

export const getProductByIdService = async (productId: string) => {
    const productRepository = getRepository(Product);
    const product: IProductDB | undefined = await productRepository.findOne({
        where: {
            product_id: productId
        }
    })

    return product;
}

export const getAllProductsService = async () => {
    const productRepository = getRepository(Product);
    const productsList: IProductDB[] = await productRepository.find();
    return productsList;

}