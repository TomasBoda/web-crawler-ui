import { getWebsitesQuery } from "@/api/api";
import Dashboard from "@/screens/dashboard/Dashboard";

function DashboardScreen() {
    return <Dashboard />
}

export async function getServerSideProps({ req, params }) {
    return { props: {} };
}

export default DashboardScreen;