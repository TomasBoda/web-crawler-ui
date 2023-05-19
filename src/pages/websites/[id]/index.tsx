import { getWebsiteQuery } from "@/api/api";
import WebsitesScreen from "@/pages/websites";
import Website from "@/screens/website/Website";
import {notConnected} from "@/utils/utils";

export default function WebsiteScreen({ website }) {
    return <Website website={website} />;
}

export async function getServerSideProps({ query }) {
    const { id } = query;
    const response = await getWebsiteQuery(id);

    if (response === null) return notConnected();

    const website = response?.data?.data?.website ?? null;

    return { props: { website } };
}