import data from '../dummy-backend.json';

export default function ProductDetails({ product }) {
    if (!product)
        return <p>Loading...</p>;

    return <>
        <h1>{product.id}</h1>
        <p>{product.title}</p>
    </>
}

export async function getStaticPaths() {
    const products = data.products;

    const paths = products.map(p => {
        return { params: { productId: p.id } }
    })

    return {
        paths,  // could be partially listed
        fallback: false
        // false: show 404 page if not listed
        // true: show fallback content (implemented in the component function) while generating
        // 'blocking': block page while generating
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.productId;

    const product = data.products.find(p => p.id === productId);

    return {
        props: {
            product
        }
    }
}