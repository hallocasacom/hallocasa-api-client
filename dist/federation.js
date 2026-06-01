"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGroupChildren = fetchGroupChildren;
exports.linkGroupChild = linkGroupChild;
async function fetchGroupChildren(axios, basePath, groupId, pageFrom = 1, pageTo = 99) {
    const base = basePath.replace(/\/$/, '');
    const response = await axios.get(`${base}/groups/${encodeURIComponent(groupId)}/children`, { params: { pageFrom, pageTo } });
    return response.data;
}
async function linkGroupChild(axios, basePath, parentGroupId, childGroupId, status = 'ACCEPTED') {
    const base = basePath.replace(/\/$/, '');
    const response = await axios.post(`${base}/groups/${encodeURIComponent(parentGroupId)}/children`, null, { params: { childGroupId, status } });
    return response.data;
}
