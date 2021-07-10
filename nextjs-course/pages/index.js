// dependences
import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';

// data
import data from '../dummy-backend.json';

export default function Home(props) {
  const products = data['products'];

  return <>
    <Head>
      <title>Home - NextJS Course</title>
    </Head>

    <h1>Products</h1>
    <i>(Data populated at client-side)</i><br/>
    <i>(Static generated during build-time)</i>
    <ul>
      {products.map(product =>
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      )}
    </ul>

    <hr />

    <h1>Products</h1>
    <i>(Data populated at client-side)</i><br/>
    <i>(Server-side rendered at runtime)</i>
    <ul>
      {products.map(product =>
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      )}
    </ul>

    <hr />

    <h1>Items inside of current folder</h1>
    <i>(Data populated at server-side)</i>
    {props.lists.map((item, i) => <li key={i}><code>{item.name}</code></li>)}
  </>
}

export async function getStaticProps(context) {
  const dirToList = process.cwd();
  const files = await fs.readdirSync(dirToList);
  const filesObject = new Array();
  for (let i = 0; i < files.length; i++) {
    let file = {
      dirId: i + 1,
      name: files[i]
    };
    filesObject.push(file)
  }

  if (!filesObject)
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  
    if (filesObject.length === 0)
    return {
      notFound: true
    }

  return {
    props: {
      lists: filesObject
    },
    revalidate: 86_400, // re-generate every 24 hours
    // redirect,
    // notFound
  }
}