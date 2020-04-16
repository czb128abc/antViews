export enum modelEmumOrganization {
  部门编号 = 'id',
  部门名称 = 'orgName',
  上级部门编号 = 'parentId',
  上级部门名称 = 'parentName',
  节点类型 = 'orgType',
  描述 = 'remark',
  删除标识 = 'delFlg',
  创建时间 = 'createDate',
}

export enum modelEmumUserGroup {
  编号 = 'id',
  用户组名 = 'groupName',
  // 用户组类型 = 'userType',
  状态 = 'groupStatus',
  菜单权限映射 = 'systemGroupMenuLinkList',
  创建时间 = 'createDate',
}

export enum modelEmumMenu {
  编号 = 'id',
  名称 = 'menuName',
  状态 = 'menuStatus',
  父级编号 = 'parentMenuId',
  父级名称 = 'parentMenuName',
  地址 = 'url',
  创建时间 = 'createDate',
}

export enum modelEmumUser {
  编号 = 'id',
  名称 = 'realName',
  组织机构编号 = 'orgId',
  组织机构名称 = 'orgName',
  电话号码 = 'phoneNumber',
  状态 = 'statues',
  创建时间 = 'createDate',
  所属用户组 = 'systemUserGroupLinkList',
  所属角色 = 'systemUserRoleLinkList',
}

export enum modelEmumRole {
  编号 = 'id',
  名称 = 'roleName',
  上级角色编号 = 'parentId',
  上级角色名称 = 'parentName',
  菜单权限映射 = 'systemRoleMenuLinkList',
  状态 = 'roleStatus',
  创建时间 = 'createDate',
  是否向下授权 = 'reAuthorize',
}

// 用户-用户组-关联
export enum modelEmumUserUserGroupLink {
  编号 = 'id',
  用户组编号 = 'userGroupId',
  用户编号 = 'userId',
  创建时间 = 'createDate',
}

// 用户组-菜单-关联
export enum modelEmumSystemGroupMenuLink {
  编号 = 'id',
  用户组编号 = 'groupId',
  菜单编号 = 'menuId',
  菜单名称 = 'menuName',
  创建时间 = 'createDate',
}

// 用户-角色-关联
export enum modelEmumUserRoleLink {
  编号 = 'id',
  角色编号 = 'roleId',
  用户编号 = 'userId',
  创建时间 = 'createDate',
}

// 角色-菜单-关联
export enum modelEmumSystemRoleMenuLink {
  编号 = 'id',
  菜单编号 = 'menuId',
  菜单名称 = 'menuName',
  用户编号 = 'userId',
  创建时间 = 'createDate',
}
// 用电设置
export enum modelEmumPowersetup {
  节点名称 = 'powersetupNodeName', // TODO powersetupNodeName 修改为 nodeName 构建的form 居然会报错,无语呀!
  续电时间 = 'continuePower',
  提醒时间 = 'remidTime',
  用电时间段列表 = 'list',
}
