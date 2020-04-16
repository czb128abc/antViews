import remote from './remoteValidator';
import allRules from './rules';

const { createRules: create, ...otherRules } = allRules;

export const rules = allRules;
export const remoteValidator = remote;
export const createRules = create;
export const theRules = otherRules;
