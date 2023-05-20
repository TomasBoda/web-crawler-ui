
export interface Website {
    identifier?: string;
    id?: string;
    label?: string;
    url?: string;
    regexp?: string;
    periodicity?: number;
    tags?: string[];
    active?: boolean;
    crawling?: boolean;
}

export interface Execution {
    id?: string;
    pageid?: string;
    timestamp: string;
}