import styled from "styled-components";
import { Container } from "@/components/Components";
import Title from "@/components/Title";
import { Website } from "@/model/model";
import Record from "@/screens/websites/components/Record";

interface Props {
    websites: Website[];
}

export default function Websites(props: Props) {

    const { websites } = props;

    return (
        <Container>
            <Title>Website records</Title>
            <List>
                {websites.map((website: Website, index: number) => <Record key={index} website={website} />)}
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