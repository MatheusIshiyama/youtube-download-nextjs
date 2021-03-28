import api from "../api";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../css/Info.module.css";

export default function Info(data) {
    const { title, thumbnail } = data;

    const router = useRouter();

    const { url, type } = router.query;
    const downloadUrl = `${process.env.API_URL}/${type}/?url=${url}`;

    function handleExit() {
        router.push("/");
    }

    return (
        <div className={styles.card}>
            <h4>
                {title}.{type}
            </h4>
            <img src={thumbnail} className={styles.cardImage} />
            <div className={styles.submit}>
                <Link href={downloadUrl} passHref>
                    <a target="_blank" className={styles.submitButton}>
                        Download
                    </a>
                </Link>
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
    const { url } = context.query;

    const response = await api.get(`/info/?url=${url}`);

    const data = {
        title: response.data.title,
        thumbnail: response.data.thumbnail,
    };

    return { props: data };
}
