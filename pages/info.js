import api from "../api";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../css/Info.module.css";
import { useEffect, useState } from "react";

export default function Info(data) {
    const { title, thumbnail, download } = data;

    const router = useRouter();

    const { type } = router.query;

    const [downloadUrl, setDownloadUrl] = useState("");

    useEffect(() => {
        setDownloadUrl(window.URL.createObjectURL(new Blob([download])));
    }, []);

    function handleExit() {
        router.push("/");
    }

    return (
        <div className={styles.card}>
            <Head>
                <title>Youtube Downloader</title>
            </Head>
            <h4>
                {title}.{type}
            </h4>
            <img src={thumbnail} className={styles.cardImage} />
            <div className={styles.submit}>
                <a
                    href={downloadUrl}
                    download={`${title}.${type}`}
                    className={styles.submitButton}
                >
                    Download
                </a>
                <a href="/" onClick={handleExit} className={styles.exit}>
                    Voltar
                </a>
            </div>
            <div className={styles.author}>
                <label>Developed by Bravan</label>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { url, type } = context.query;

    const response = await api.get(`/info/?url=${url}`);

    const downloadResponse = await api.get(`${type}/?url=${url}`, {
        responseType: "blob",
    });

    const data = {
        title: response.data.title,
        thumbnail: response.data.thumbnail,
        download: downloadResponse.data,
    };

    return { props: data };
}
