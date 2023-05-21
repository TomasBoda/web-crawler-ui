import styled from "styled-components";
import {Container} from "@/components/Components";
import Title from "@/components/Title";
import {useEffect} from "react";
import {getWebsitesQuery} from "@/api/api";
import {notConnected} from "@/utils/utils";

export default function Dashboard({ websitesCount, executionsCount }) {

    return (
        <Container>
            <Title>Dashboard</Title>

            <List>
                <Param>Total websites</Param>
                <Value>{websitesCount} {websitesCount === 1 ? "website" : "websites"}</Value>

                <Param>Total executions</Param>
                <Value>{executionsCount} {executionsCount === 1 ? "execution" : "executions"}</Value>
            </List>
        </Container>
    )
}

const List = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 5px 50px;
  
  margin-top: 50px;
`;

const Param = styled.p`
  color: black;
  font-size: 18px;
  font-weight: 600;
`;

const Value = styled.p`
  color: black;
  font-size: 18px;
  font-weight: 400;
`;