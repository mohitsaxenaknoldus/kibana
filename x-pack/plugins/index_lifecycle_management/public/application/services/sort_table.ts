/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { sortBy } from 'lodash';
import { PolicyFromES } from '../../../common/types';
import { TableColumn } from '../sections/policy_table';

export const sortTable = (
  array: PolicyFromES[] = [],
  sortField: TableColumn,
  isSortAscending: boolean
): PolicyFromES[] => {
  let sorter;
  if (sortField === 'indices' || sortField === 'indexTemplates') {
    sorter = (item: PolicyFromES) => (item[sortField] || []).length;
  } else {
    sorter = (item: PolicyFromES) => item[sortField];
  }
  const sorted = sortBy(array, sorter);
  return isSortAscending ? sorted : sorted.reverse();
};
