export const ROOT_ORG_ID = '1';
export const ROOT_ROLE = '1';

export function isRootOrg(orgId) {
  return `${orgId}` === ROOT_ORG_ID;
}

export function isRootRole(roleId) {
  return `${roleId}` === ROOT_ROLE;
}
