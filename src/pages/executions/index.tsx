import Executions from "@/screens/executions/Executions";
import {getExecutionsQuery, getWebsitesQuery} from "@/api/api";
import {notConnected, redirect} from "@/utils/utils";

function ExecutionsScreen({ executions }) {
    return <Executions executions={executions} />
}

export async function getServerSideProps({ req, params }) {
    //const response = await getExecutionsQuery();

    //if (response === null) return notConnected();

    //const executions = response?.data?.data?.executions ?? null;

    return { props: { executions: [] } };
}

export default ExecutionsScreen;