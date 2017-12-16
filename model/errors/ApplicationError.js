const PRODUCT_NOT_FOUND = "productNotFound";

export default class ApplicationError extends Error {
  constructor(message, erorrType) {
    super(message);
  }

  static throwIfProductNotFound(product, hint) {
    if (!product) {
      throw new ApplicationError(
        `cannot find product by ${hint}`,
        PRODUCT_NOT_FOUND
      );
    }
  }
}
