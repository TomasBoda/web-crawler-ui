import styled from "styled-components";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import {useEffect, useState} from "react";

export default function Navigation({ hasNext }) {

    const router = useRouter();

    const [limit, setLimit] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        updateLimitAndOffset();
    }, [router]);

    function updateLimitAndOffset() {
        const { limit, offset } = router.query;

        const queryLimit = parseInt(limit.toString());
        const queryOffset = parseInt(offset.toString());

        setLimit(queryLimit);
        setOffset(queryOffset);
    }

    function nextPage() {
        const { limit, offset } = router.query;

        const queryLimit = parseInt(limit.toString());
        const queryOffset = parseInt(offset.toString());

        router.replace({
            pathname: router.pathname,
            query: {
                limit: queryLimit,
                offset: queryOffset + 1
            }
        });
    }

    function previousPage() {
        const { limit, offset } = router.query;

        const queryLimit = parseInt(limit.toString());
        const queryOffset = parseInt(offset.toString());

        if (queryOffset === 0) return;

        router.replace({
            pathname: router.pathname,
            query: {
                limit: queryLimit,
                offset: queryOffset - 1
            }
        });
    }

    return (
        <Container>
            <div />
            {offset > 0 && <Button type="secondary" size="large" onClick={() => previousPage()}>Previous</Button>}
            {hasNext && <Button type="primary" size="large" onClick={() => nextPage()}>Next</Button>}
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  
  margin-top: 50px;
`;