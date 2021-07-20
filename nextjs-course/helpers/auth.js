import { getSession } from "next-auth/client";

export default async function handleLogin(context, action, next) {
    const session = await getSession({ req: context.req });
    const nextUrl = next ? `/?next=${next}` : '';

    if (!session && action === 'block')
        return {
            redirect: {
                destination: `/login${nextUrl}`,
                permanent: false
            }
        }

    if (session && action === 'bypass')
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    return {
        props: { session }
    }
}