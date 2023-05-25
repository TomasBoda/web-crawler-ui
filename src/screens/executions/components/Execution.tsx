import styled from "styled-components";
import { useEffect } from "react";
import {getDateTime, getFormattedURL} from "@/utils/utils";
import Button from "@/components/Button";

export default function Execution({ execution }) {

    const { id, page, timestamp, crawled, finished } = execution;
    const websiteUrl = "/websites/" + page.identifier;

    return (
        <Container>
            <Active active={finished} />
            <Id>{id}</Id>
            <Timestamp>{getDateTime(timestamp)}</Timestamp>
            <Crawled>{crawled} crawled nodes</Crawled>
            <URL>{getFormattedURL(page.url)}</URL>
            <Button type="secondary" size="small" href={websiteUrl}>See website</Button>
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  
  display: grid;
  grid-template-columns: auto 200px 250px 200px 1fr auto;
  gap: 15px;
  align-items: center;
  
  padding: 15px 15px 15px 25px;
  
  background-color: white;
  box-shadow: 0px 0px 10px -5px gray;
  border-radius: 5px;
`;

const Active = styled.span`
  width: 10px;
  height: 10px;
  
  border-radius: 5px;
  
  background-color: ${props => props.active ? "green" : "red"};
`;

const Id = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 500;
`;

const Timestamp = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 500;
`;

const Crawled = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 500;
`;

const URL = styled.p`
  color: black;
  font-size: 16px;
  font-weight: 500;
`;