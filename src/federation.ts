import type { AxiosInstance } from 'axios';
import type { Group } from './generated';

export interface GroupChild {
    id?: number;
    parentGroup?: Group;
    childGroup?: Group;
    groupMemberStatus?: string;
    creationDate?: string;
}

export interface GroupChildFilterResult {
    count?: number;
    list?: GroupChild[];
}

export async function fetchGroupChildren(
    axios: AxiosInstance,
    basePath: string,
    groupId: string,
    pageFrom = 1,
    pageTo = 99
): Promise<GroupChildFilterResult> {
    const base = basePath.replace(/\/$/, '');
    const response = await axios.get<GroupChildFilterResult>(
        `${base}/groups/${encodeURIComponent(groupId)}/children`,
        { params: { pageFrom, pageTo } }
    );
    return response.data;
}

export async function linkGroupChild(
    axios: AxiosInstance,
    basePath: string,
    parentGroupId: string,
    childGroupId: string,
    status = 'ACCEPTED'
): Promise<GroupChild> {
    const base = basePath.replace(/\/$/, '');
    const response = await axios.post<GroupChild>(
        `${base}/groups/${encodeURIComponent(parentGroupId)}/children`,
        null,
        { params: { childGroupId, status } }
    );
    return response.data;
}
