import api from "../api";
import { useRouter } from "next/router";
import styles from "../css/Info.module.css";

export default function Info(data) {
    const { title, thumbnail } = data;

    const router = useRouter();

    const { url, type } = router.query;

    async function handleDownload(event) {
        event.preventDefault();

        api.get(`${type}/?url=${url}`, { responseType: "blob" })
            .then(async (response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${title}.${type}`);
                link.click();
            })
            .then(() => {
                router.push("/");
            });
    }

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
                <a
                    href="/"
                    onClick={handleDownload}
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
    const { url } = context.query;

    const response = await api.get(`/info/?url=${url}`);

    const data = {
        title: response.data.title,
        thumbnail: response.data.thumbnail,
    };

    return { props: data };
}
