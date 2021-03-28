import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function redirect(data) {
    const router = useRouter();

    useEffect(() => {
        window.location.assign(data.data);
        router.push("/");
    }, []);

    return (
        <Head>
            <title>Youtube Downloader</title>
        </Head>
    );
}

export async function getServerSideProps(context) {
    const { url, type } = await context.query;
    const downloadUrl = `${process.env.API_URL}/${type}/?url=${url}`;

    return { props: { data: downloadUrl } };
}
