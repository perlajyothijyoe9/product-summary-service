"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformProduct = transformProduct;
function transformProduct(node) {
    return {
        id: node.id,
        title: node.title,
        price: Number(node.variants.edges[0]?.node.price ?? 0),
        inventory: node.totalInventory,
        created_at: node.createdAt
    };
}
