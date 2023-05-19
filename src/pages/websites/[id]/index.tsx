import {getWebsiteNodesQuery, getWebsiteQuery} from "@/api/api";
import WebsitesScreen from "@/pages/websites";
import Website from "@/screens/website/Website";
import {notConnected} from "@/utils/utils";
import {useEffect} from "react";

export default function WebsiteScreen({ website, nodes }) {

    return <Website website={website} nodes={nodes} />;
}

export async function getServerSideProps({ query }) {
    const { id } = query;
    const getWebsite = await getWebsiteQuery(id);
    if (getWebsite === null) return notConnected();

    const website = getWebsite?.data?.data?.website ?? null;

    const getNodes = await getWebsiteNodesQuery([ website.identifier ]);
    const nodes = getNodes?.data?.data?.nodes ?? null;

    return { props: { website, nodes } };
}