import data from '../../dummy-backend.json';

export default function ProductDetaisl(props) {
    const { product } = props;

    // fallback
    if (!product)
        return <p>Loading...</p>;

    return <>
        <h1>{product.id}</h1>
        <p>{product.title}</p>
    </>
}

export async function getServerSideProps(context) {
    const { params, query, req, res } = context;
    console.log('params =', params);
    console.log('query =', query);

    const products = data.products;
    const product = products.find(p => p.id === params.id);

    if (!product)
        return {
            notFound: true
        }

    return {
        props: { product }
    }
}