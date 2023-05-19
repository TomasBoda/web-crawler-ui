import Websites from "@/screens/websites/Websites";
import {getWebsitesQuery} from "@/api/api";
import {notConnected, redirect} from "@/utils/utils";

function WebsitesScreen({ websites }) {
    return <Websites websites={websites} />
}

export async function getServerSideProps({ req, params }) {
    const response = await getWebsitesQuery();

    if (response === null) return notConnected();

    const websites = response?.data?.data?.websites ?? null;

    return { props: { websites } };
}

export default WebsitesScreen;