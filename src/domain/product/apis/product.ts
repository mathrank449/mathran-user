import { AxiosError } from "axios";
import instance from "../../../shared/apis/instance";
import type { Product } from "../types/product";

export const getProductList = async (): Promise<Product[]> => {
  try {
    const { data: productList } = await instance.get("/v1/point/products");

    return productList;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const purchaseProduct = async (paymentId: string) => {
  try {
    const response = await instance.post(
      `/v1/point/product/payment/${paymentId}`
    );

    return response;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
