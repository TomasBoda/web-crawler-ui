import styled from "styled-components";
import React from "react";
import { Container, InputField, Panel, Heading, Text, TagList, TagItem, RemoveIcon, Label } from "@/components/Components";
import Title from "@/components/Title";
import { Website } from "@/model/model";
import { getFormattedURL } from "@/utils/utils";
import Toggle from "@/components/Toggle";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import dynamic from "next/dynamic";
import {crawlWebsiteQuery, deleteWebsiteQuery} from "@/api/api";
import {GraphData, GraphEdge, GraphNode} from "@/screens/website/Graph";
import {useRouter} from "next/router";
import {hideLoading, showLoading} from "@/components/Loading";
import {showDialog} from "@/components/Dialog";
const Graph = dynamic(() => import("./Graph"), { ssr: false });

interface Props {
    website: Website;
    nodes: any[];
}

export default function Website(props: Props) {

    const router = useRouter();

    const { website, nodes } = props;

    const [loaded, setLoaded] = useState(false);

    const [showingInfo, setShowingInfo] = useState(false);
    const [updated, setUpdated] = useState(false);

    const [url, setUrl] = useState(website.url);
    const [label, setLabel] = useState(website.label);
    const [regexp, setRegexp] = useState(website.regexp);
    const [periodicity, setPeriodicity] = useState(website.periodicity);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState(website.tags);
    const [active, setActive] = useState(website.active);

    useEffect(() => setLoaded(true), [])

    useEffect(() => {
        if (tags.length !== website.tags.length) {
            setUpdated(true);
            return;
        }

        for (let i = 0; i < tags.length; i++) {
            if (tags[i].trim() !== website.tags[i]) {
                setUpdated(true);
                return;
            }
        }

        if (url.trim() !== website.url ||
            label.trim() !== website.label ||
            regexp.trim() !== website.regexp ||
            active !== website.active) {
            setUpdated(true);
        } else {
            setUpdated(false);
        }
    }, [url, label, regexp, tags, active]);

    async function updateWebsite() {

    }

    async function crawlWebsite() {
        await crawlWebsiteQuery(website.id ?? website.identifier);
    }

    async function deleteWebsite() {
        showLoading();

        const response = await deleteWebsiteQuery(website.id ?? website.identifier);
        const result = response?.data?.data?.deleteWebsite ?? null;

        const status = result?.status ?? null;
        const message = result?.message ?? null;

        if (message === "Website deleted successfully" && status === 200) {
            hideLoading();
            showDialog({
                heading: "Website deleted",
                text: "The website was successfully deleted from your domain list. All the corresponding data was deleted as well.",
                primary: {
                    label: "See websites",
                    onClick: () => router.push("/websites")
                },
                secondary: {
                    label: "Cancel",
                    onClick: () => router.reload()
                }
            });
        } else {
            showDialog({
                heading: "Error deleting website",
                text: "The website couldn't be deleted from your websites list. Please try again later.",
                primary: {
                    label: "See websites",
                    onClick: () => router.push("/websites")
                },
                secondary: {
                    label: "Cancel",
                    onClick: () => router.reload()
                }
            });
        }
    }

    function addTag(event) {
        if (event.key !== "Enter" || tag.trim() === "" || tags.includes(tag.trim().toLowerCase())) {
            return;
        }

        setTags([ ...tags, tag.trim().toLowerCase() ]);
        setTag("");
    }

    function removeTag(index: number) {
        const newTags = [ ...tags ];
        newTags.splice(index, 1);
        setTags(newTags);
    }

    return (
        <Container>
            <Title>
                <Active active={website.active} title="Active (website is crawled actively)" />
                {getFormattedURL(website.url)}
            </Title>

            <ButtonBar>
                <Button type="primary" size="small" onClick={() => crawlWebsite()}>Crawl</Button>
                <Button type="warn" size="small" onClick={() => deleteWebsite()}>Delete</Button>
            </ButtonBar>

            <Panel>
                <Heading>Website information</Heading>
                <Text>
                    This section shows general information about the given website. To update website information, edit desired fields and click on the update button;
                </Text>

                <Label onClick={() => setShowingInfo(!showingInfo)}>
                    {showingInfo ? "Hide website information" : "Website information"}
                </Label>

                {showingInfo &&
                    <Content>
                        <Table>
                            <Param>Website ID</Param>
                            <InputField type="text" value={website.identifier} disabled={true}></InputField>

                            <Param>URL</Param>
                            <InputField type="text" value={url} onChange={e => setUrl(e.target.value)}></InputField>

                            <Param>Label</Param>
                            <InputField type="text" placeholder="Enter website label" value={label}
                                        onChange={e => setLabel(e.target.value)}></InputField>

                            <Param>Regexp</Param>
                            <InputField type="text" placeholder="Enter crawling regex" value={regexp}
                                        onChange={e => setRegexp(e.target.value)}></InputField>

                            <Param>Tags</Param>
                            <InputField type="text" placeholder="Enter a new tag (press Enter)" value={tag}
                                        onChange={e => setTag(e.target.value)} onKeyDown={addTag}></InputField>

                            <span></span>
                            <TagList>
                                {tags.map((tag, index) =>
                                    <TagItem key={index}>
                                        {tag}
                                        <RemoveIcon onClick={() => removeTag(index)}>x</RemoveIcon>
                                    </TagItem>
                                )}
                            </TagList>

                            <span/><span/>

                            <Param>Active</Param>
                            <Toggle toggled={active} onToggle={() => setActive(!active)}/>
                        </Table>

                        {updated &&
                            <ButtonBar>
                                <Button type="primary" size="small" onClick={() => updateWebsite()}>Update</Button>
                            </ButtonBar>
                        }
                    </Content>
                }
            </Panel>

            <GraphPanel>
                <Heading>Graph</Heading>
                <Graph nodes={nodes} />
            </GraphPanel>
        </Container>
    )
}

const Active = styled.span`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  
  margin-right: 20px;
  
  background-color: ${props => props.active ? "green" : "red"};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 8px 50px;
  align-items: center;
  
  margin-top: 30px;
`;

const Param = styled.div`
  color: black;
  font-size: 15px;
  font-weight: 600;
`;

const ButtonBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  
  margin-top: 30px;
`;

const GraphPanel = styled(Panel)`
  width: 100%;
  max-width: 100%;
  height: 700px;
  
  position: relative;
`;