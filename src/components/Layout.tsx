import styled from "styled-components";
import Menu from "@/components/Menu";
import Loading from "@/components/Loading";

export default function Layout({ children }) {
    return (
        <Container>
            <Main>
                <Menu />

                <Loading />

                {children}
            </Main>
        </Container>
    )
}

export const Container = styled.div`
  width: 100vw;
  max-width: 100vw;

  overflow-x: hidden;
`;

export const Main = styled.div`
  width: 100vw;
  
  display: flex;
  flex-direction: row;
  
  padding-left: 350px;
`;