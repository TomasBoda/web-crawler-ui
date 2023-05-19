import gql from "graphql-tag";

export const GetWebsitesQuery = gql`
    query {
        websites {
            identifier
            label
            url
            regexp
            tags
            active
        }
    }
`

export const GetWebsiteQuery = gql`
    query website($webPageId: ID!) {
        website(webPageId: $webPageId) {
            identifier
            label
            url
            regexp
            tags
            active
        }
    }
`;

export const AddWebsiteQuery = gql`
    mutation addWebsite($label: String!, $url: String!, $regexp: String!, $periodicity: Int!, $tags: [String!]!, $active: Boolean!) {
        addWebsite(label: $label, url: $url, regexp: $regexp, periodicity: $periodicity, tags: $tags, active: $active) {
            message
            status
        }
    }
`;

export const UpdateWebsiteQuery = gql`
    mutation updateWebsite($id: ID!, $label: String, $url: String, $regexp: String, $periodicity: Int, $tags: [String!], $active: Boolean) {
        updateWebsite(id: $id, label: $label, url: $url, regexp: $regexp, periodicity: $periodicity, tags: $tags, active: $active) {
            message
            status
        }
    }
`;

export const GetWebsiteNodesQuery = gql`
    query nodes($webPages: [ID!]!) {
        nodes(webPages: $webPages) {
            id
            title
            url
            parentId
        }
    }
`;
