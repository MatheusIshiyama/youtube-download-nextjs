import Link from "next/link";
import { useState } from "react";
import styles from "../css/Home.module.css";

export default function Home() {
    const [url, setUrl] = useState("");
    const [type, setType] = useState("mp3");

    function handleVideo(event) {
        setUrl(event.target.value);
    }

    function handleType(event) {
        setType(event.target.value);
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Youtube downloader</h2>
            <div className={styles.cardContent}>
                <input
                    type="text"
                    name="url"
                    required
                    onChange={handleVideo}
                    className={styles.inputUrl}
                />
                <select
                    required
                    onChange={handleType}
                    className={styles.inputType}
                    defaultValue="mp3"
                >
                    <option value="mp3">.mp3</option>
                    <option value="mp4">.mp4</option>
                </select>
            </div>
            <div className={styles.submit}>
                <Link
                    href={{
                        pathname: "/api/validate",
                        query: { type: type, url: url },
                    }}
                >
                    <a className={styles.submitButton}>Validar url</a>
                </Link>
            </div>
            <div className={styles.author}>
                <label>Developed by Bravan</label>
            </div>
        </div>
    );
}
