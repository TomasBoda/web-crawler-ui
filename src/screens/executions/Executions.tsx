import styled from "styled-components";
import { Container } from "@/components/Components";
import Title from "@/components/Title";
import { Execution } from "@/model/model";
import {useEffect} from "react";
import {getExecutionsQuery} from "@/api/api";

interface Props {
    executions: Execution[];
}

export default function Executions(props: Props) {

    const { executions } = props;

    useEffect(() => {
        getExecutions();
    }, []);

    async function getExecutions() {
        const response = await getExecutionsQuery();
    }

    return (
        <Container>
            <Title>Executions</Title>
            <List>

            </List>
        </Container>
    )
}

const List = styled.div`
  width: 100%;
  
  display: grid;
  grid-template-columns: auto;
  gap: 15px;
  
  margin-top: 50px;
`;