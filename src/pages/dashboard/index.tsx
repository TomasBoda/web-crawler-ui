import {getExecutionsQuery, getWebsitesQuery} from "@/api/api";
import Dashboard from "@/screens/dashboard/Dashboard";
import {notConnected} from "@/utils/utils";
import web from "react-use-measure/src/web";

function DashboardScreen({ websitesCount, executionsCount }) {
    return (
        <Dashboard
            websitesCount={websitesCount}
            executionsCount={executionsCount}
        />
    )
}

export async function getServerSideProps({ req, params }) {
    const websites = await getWebsites();
    const executions = await getExecutions();

    return {
        props: {
            websitesCount: websites.length,
            executionsCount: executions.length
        }
    };
}

async function getWebsites() {
    const response = await getWebsitesQuery();
    const websites = response?.data?.data?.websites ?? [];
    return websites;
}

async function getExecutions() {
    const response = await getExecutionsQuery();
    const executions = response?.data?.data?.executions ?? [];
    return executions;
}

export default DashboardScreen;