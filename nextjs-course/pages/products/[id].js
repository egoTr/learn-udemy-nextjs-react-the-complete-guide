import { useRouter } from 'next/router';
import Head from 'next/head';

const DUMMY_PRODUCTS = [
    { id: 1, name: 'iPhone X', price: 120.0 },
    { id: 2, name: 'Samsung Galaxy S3', price: 80.5 },
    { id: 3, name: 'Google Pixel III', price: 85.0 },
];

export default function ProductDetails() {
    const router = useRouter();

    const { id } = router.query; console.log(router.query);
    let product = DUMMY_PRODUCTS.find( p => p.id.toString() === id.toString() );
    if (!product)
        product = { name: 'No product found ', price: 'N/A' };

    return <>
        <Head>
            <title>Product details: {product.name}</title>
        </Head>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
    </>
}