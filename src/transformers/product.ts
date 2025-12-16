
export function transformProduct(node: any) {
  return {
    id: node.id,
    title: node.title,
    price: Number(node.variants.edges[0]?.node.price ?? 0),
    inventory: node.totalInventory,
    created_at: node.createdAt
  };
}
