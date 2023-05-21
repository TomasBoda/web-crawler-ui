import styled from "styled-components";
import {Container, Empty} from "@/components/Components";
import Title from "@/components/Title";
import { Website } from "@/model/model";
import Record from "@/screens/websites/components/Record";
import Navigation from "@/components/Navigation";
import {useRouter} from "next/router";

interface Props {
    websites: Website[];
}

export default function Websites(props: Props) {

    const router = useRouter();
    const limit = router.query.limit ? parseInt(router.query.limit.toString()) : 0;

    const { websites } = props;

    return (
        <Container>
            <Title>Website records</Title>
            <List>
                {websites.map((website: Website, index: number) => <Record key={index} website={website} />)}
            </List>

            {websites.length === 0 && <Empty>No websites</Empty>}

            <Navigation hasNext={websites.length === limit} />
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