import Websites from "@/screens/websites/Websites";
import {getWebsitesQuery} from "@/api/api";
import {notConnected, redirect} from "@/utils/utils";

function WebsitesScreen({ websites }) {
    return <Websites websites={websites} />
}

export async function getServerSideProps({ query, req, params }) {
    const { limit, offset } = query;

    if (!limit || !offset) {
        return redirect("/websites?limit=10&offset=0");
    }

    const queryLimit = limit ? parseInt(limit) : 10;
    const queryOffset = offset ? parseInt(offset) * limit : 0;

    const response = await getWebsitesQuery({ limit: queryLimit, offset: queryOffset });

    if (response === null) return notConnected();

    const websites = response?.data?.data?.websites ?? null;

    return { props: { websites } };
}

export default WebsitesScreen;