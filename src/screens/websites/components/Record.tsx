import styled from "styled-components";
import { useEffect } from "react";
import { getFormattedURL } from "@/utils/utils";
import Button from "@/components/Button";

export default function Record({ website }) {

    const { identifier, label, url, regexp, periodicity, tags, active } = website;

    return (
        <Container>
            <Active active={active} title="Active (website is crawled actively)" />
            <Url>{getFormattedURL(url)}</Url>
            <Button type="primary" size="small" href={`/websites/${identifier}`}>Detail</Button>
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  
  display: grid;
  grid-template-columns: auto 1fr auto;
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

const Url = styled.h3`
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
`;