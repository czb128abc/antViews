// eslint-disable-next-line import/no-unresolved
/**
 DROP TABLE IF EXISTS `eauser`;
  CREATE TABLE `eauser` (
  `USERID` varchar(8) NOT NULL COMMENT '用户编号',
  `USERNAME` varchar(20) NOT NULL COMMENT '用户名',
  `ACCOUNT` varchar(30) NOT NULL COMMENT '登陆帐户',
  `PASSWORD` varchar(50) NOT NULL COMMENT '密码',
  `SEX` varchar(2) NOT NULL default '0' COMMENT '性别(0:未知;1:男;2:女)',
  `DEPTID` varchar(100) NOT NULL COMMENT '部门编号',
  `LOCKED` varchar(2) NOT NULL default '0' COMMENT '锁定标志(1:锁定;0:激活)',
  `REMARK` varchar(50) default NULL COMMENT '备注',
  `USERTYPE` varchar(2) default '1' COMMENT '人员类型(1:经办员;2:管理员;3:系统内置人员;)',
  `ENABLED` varchar(2) NOT NULL default '1' COMMENT '启用状态',
  PRIMARY KEY  (`USERID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
 */
export const keyMapUser = new Map([
  ['用户编号', 'id'],
  ['用户名', 'userName'],
  ['登陆帐户', 'account'],
  ['密码', 'password'],
  ['部门编号', 'deptId'],
  ['用户类型', 'userType'], // 人员类型(1:经办员;2:管理员;3:系统内置人员;
  ['创建时间', 'createDate'],
]);

/**
 *
  `DEPTID` varchar(100) NOT NULL COMMENT '部门编号',
  `DEPTNAME` varchar(20) NOT NULL COMMENT '部门名称',
  `PARENTID` varchar(100) NOT NULL COMMENT '上级部门编号',
  `CUSTOMID` varchar(10) default NULL COMMENT '自定义部门编号',
  `ENABLED` varchar(1) NOT NULL default '1' COMMENT '启用状态',
  `SORTNO` int(4) default NULL COMMENT '排序号',
  `LEAF` varchar(2) NOT NULL default '0' COMMENT '叶子节点(0:树枝节点;1:叶子节点)',
  `REMARK` varchar(100) default NULL COMMENT '备注',
 */
export const keyMapOrganization = new Map([
  ['部门编号', 'id'],
  ['部门名称', 'orgName'],
  ['上级部门编号', 'parentId'],
  ['上级部门名称', 'parentName'],
  ['节点类型', 'orgType'],
  ['描述', 'remark'],
  ['删除标识', 'delFlg'],
  ['创建时间', 'createDate'],
]);

export const keyMapUserGroup = new Map([
  ['用户组编号', 'id'],
  ['用户组名', 'groupName'],
  ['用户组类型', 'userType'], // 人员类型(1:经办员;2:管理员;3:系统内置人员;
  ['状态', 'groupStatus'],
  ['菜单权限映射', 'systemGroupMenuLinkList'],
  ['创建时间', 'createDate'],
]);

export const keyMapRole = new Map([
  ['角色编号', 'id'],
  ['角色名称', 'roleName'],
  ['上级角色编号', 'parentId'],
  ['创建时间', 'createDate'],
]);

// 用户-用户组-关联
export const keyMapUserUserGroupLink = new Map([
  ['编号', 'id'],
  ['用户组编号', 'userGroupId'],
  ['用户编号', 'userId'],
  ['创建时间', 'createDate'],
]);

// 用户组-菜单-关联
export const keyMapSystemGroupMenuLink = new Map([
  ['编号', 'id'],
  ['用户组编号', 'groupId'],
  ['菜单编号', 'menuId'],
  ['菜单名称', 'menuName'],
  ['创建时间', 'createDate'],
]);

// 用户-角色-关联
export const keyMapUserRoleLink = new Map([
  ['编号', 'id'],
  ['角色编号', 'roleId'],
  ['用户编号', 'userId'],
  ['创建时间', 'createDate'],
]);

// 角色-菜单-关联
export const keyMapSystemRoleMenuLink = new Map([
  ['编号', 'id'],
  ['菜单编号', 'menuId'],
  ['菜单名称', 'menuName'],
  ['用户编号', 'userId'],
  ['创建时间', 'createDate'],
]);
