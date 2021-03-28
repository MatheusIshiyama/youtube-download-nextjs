import api from "../../api";

export default async function handle(req, res) {
    const { url, type } = req.query;

    if (url) {
        api.get("/info?url=" + url).then(
            (response) => {
                res.redirect(`/info?type=${type}&url=${url}`);
            },
            (error) => {
                res.redirect("/");
            }
        );
    } else {
        res.redirect("/");
    }
}
