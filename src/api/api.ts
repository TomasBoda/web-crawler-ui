import axios from "axios";
import { print } from "graphql";
import {
    AddWebsiteQuery, DeleteWebsiteQuery,
    GetWebsiteNodesQuery,
    GetWebsiteQuery,
    GetWebsitesQuery,
    UpdateWebsiteQuery
} from "@/api/model";
import { Website } from "@/model/model";

export const API_URL = "http://195.113.19.168:3000/graphql";

async function query(query, variables?) {
    const headers = {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };
    const data = { query: print(query), variables };
    const options = { method: "POST", url: API_URL, headers, data: JSON.stringify(data) };

    return await axios(options).catch(error => null);
}

export async function getWebsiteQuery(webPageId: string) {
    return await query(GetWebsiteQuery, { webPageId });
}

export async function getWebsitesQuery() {
    return await query(GetWebsitesQuery);
}

export async function addWebsiteQuery(params: Website) {
    return await query(AddWebsiteQuery, params)
}

export async function updateWebsiteQuery(params: Website) {
    return await query(UpdateWebsiteQuery, params);
}

export async function deleteWebsiteQuery(id: string) {
    return await query(DeleteWebsiteQuery, { id });
}

export async function crawlWebsiteQuery(id: string) {
    return await query(UpdateWebsiteQuery, { id });
}

export async function getWebsiteNodesQuery(webPages: string[]) {
    return await query(GetWebsiteNodesQuery, { webPages });
}