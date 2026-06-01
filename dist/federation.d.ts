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
export declare function fetchGroupChildren(axios: AxiosInstance, basePath: string, groupId: string, pageFrom?: number, pageTo?: number): Promise<GroupChildFilterResult>;
export declare function linkGroupChild(axios: AxiosInstance, basePath: string, parentGroupId: string, childGroupId: string, status?: string): Promise<GroupChild>;
