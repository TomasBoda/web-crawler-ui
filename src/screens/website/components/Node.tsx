import styled from "styled-components";
import Button from "@/components/Button";
import {useEffect} from "react";
import {hideLoading, showLoading} from "@/components/Loading";
import {addWebsiteQuery} from "@/api/api";
import {hideDialog, showDialog} from "@/components/Dialog";
import {useRouter} from "next/router";

export default function Node({ node }) {

    const router = useRouter();

    const { id, title, url, crawlTime, parentId } = node;

    function tryAddWebsite() {
        showDialog({
           heading: "Crawl new webpage",
           text: `Do you really want to create a new website record on URL ${url}?`,
           primary: {
               label: "Crawl",
               onClick: () => addWebsite()
           },
            secondary: {
               label: "Cancel",
                onClick: () => hideDialog()
            }
        });
    }

    function addWebsite() {
        router.push({
            pathname: "/crawl",
            query: { domainUrl: encodeURI(url) }
        })
    }

    return (
        <Container>
            <Value>{title ?? "No title"}</Value>
            <Value>{crawlTime ?? "Not crawled"}</Value>
            <Value>{url}</Value>
            <Button type="primary" size="small" onClick={() => tryAddWebsite()}>Crawl</Button>
        </Container>
    )
}

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 200px 100px 1fr auto;
  gap: 15px;
  align-items: center;

  padding: 15px 15px 15px 25px;

  background-color: white;
  box-shadow: 0px 0px 10px -5px gray;
  border-radius: 5px;
`;

const Value = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;