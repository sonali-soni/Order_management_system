export interface Product {
    id: string;
    description: string;
    category: string;
    price: string;
}

export interface OrderItem {
    'product-id': string;
    quantity: string;
    'unit-price': string;
    total: string;
}

export interface Order {
    id: string;
    'customer-id': string;
    items: OrderItem[];
    total: string;
}
