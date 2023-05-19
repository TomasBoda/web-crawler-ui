import { GraphCanvas } from "reagraph";
import styled from "styled-components";
import React, {useEffect} from "react";

export default function Graph({ data }) {
    return (
        <Container>
            <GraphCanvas
                labelType="nodes"
                layoutType="treeTd3d"
                nodes={data.nodes}
                edges={data.edges}
            />
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;