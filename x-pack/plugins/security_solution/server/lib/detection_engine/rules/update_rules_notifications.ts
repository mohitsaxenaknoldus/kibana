/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { RuleAlertAction } from '../../../../common/detection_engine/types';
import { RulesClient, AlertServices } from '../../../../../alerting/server';
import { updateOrCreateRuleActionsSavedObject } from '../rule_actions/update_or_create_rule_actions_saved_object';
import { updateNotifications } from '../notifications/update_notifications';
import { RuleActions } from '../rule_actions/types';

interface UpdateRulesNotifications {
  rulesClient: RulesClient;
  savedObjectsClient: AlertServices['savedObjectsClient'];
  ruleAlertId: string;
  actions: RuleAlertAction[] | undefined;
  throttle: string | null | undefined;
  enabled: boolean;
  name: string;
}

export const updateRulesNotifications = async ({
  rulesClient,
  savedObjectsClient,
  ruleAlertId,
  actions,
  enabled,
  name,
  throttle,
}: UpdateRulesNotifications): Promise<RuleActions> => {
  const ruleActions = await updateOrCreateRuleActionsSavedObject({
    savedObjectsClient,
    ruleAlertId,
    actions,
    throttle,
  });

  await updateNotifications({
    rulesClient,
    ruleAlertId,
    enabled,
    name,
    actions: ruleActions.actions,
    interval: ruleActions.alertThrottle,
  });

  return ruleActions;
};
