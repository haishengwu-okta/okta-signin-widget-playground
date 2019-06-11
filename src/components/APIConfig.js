


import React from 'react';
import Tree from 'rc-tree';
import PropTypes from 'prop-types';
import 'rc-tree/assets/index.css';
import './APIConfig.css';
import { Header, Card, Button,} from 'semantic-ui-react';

const transactions = [
  {
    key: 'MFA_REQUIRED',
    children: [
      'FIDO',
      'GOOGLE_TOTP',
      'OKTA_PUSH',
      'OKTA_SMS',
      'OKTA_CALL',
      'OKTA_EMAIL',
      'OKTA_SECURITY_QUESTION',
    ],
  },
  {
    key: 'UNAUTHENTICATED',
  },
  {
    key: 'LOCKED_OUT',
  },
  {
    key: 'PASSWORD_EXPIRED',
  },
  {
    key: 'PASSWORD_WARN',
  },
  {
    key: 'PASSWORD_RESET',
  },
  {
    key: 'RECOVERY_CHALLENGE',
  },
  {
    key: 'RECOVERY',
  },
  {
    key: 'SUCCESS',
  },
  {
    key: 'UNLOCK',
  },
];

const registrations = [
  { key: 'schema', },
  { key: 'register', },
];

const runtimeConfigs = [
  {
    key: 'MFA_CHALLENGE',
    children: [
      'OKTA_PUSH_ACCEPT',
      'OKTA_PUSH_TIMEOUT',
      'OKTA_PUSH_REJECT',
    ],
  },
];

//
//
// ,
// MFA_ENROLL,
// MFA_ENROLL_ACTIVATE,
// CONSENT_REQUIRED
//

const convertToTreeData = (obj) => {
  const children = Array.isArray(obj.children) ? obj.children.map((x) => {
    return { key: `${obj.key}--${x}`, title: x, };
  }) : [];
  return { key: obj.key, title: obj.key, children, };
};
const treeDataTransactions = transactions.map(convertToTreeData);
const treeDataRegistrations = registrations.map(convertToTreeData);
const treeDataRuntimeConfig = runtimeConfigs.map(convertToTreeData);

const convertKeysToPostData = (keys) => {
  const result = {};
  keys.forEach((key) => {
    if (key.indexOf('--') > 0) {
      const [parent, child,] = key.split('--');
      if (!result[parent]) {
        result[parent] = { key: parent, children: [], };
      }
      result[parent].children.push(child);
    } else {
      result[key] = { key, children: [], };
    }
  });
  return Object.values(result);
};

class APIConfig extends React.Component {
    static propTypes = {
      apiConfigFn: PropTypes.func,
    };

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    notify = (message) => {
      console.debug(message);
    }

    onCheck = (checkedKeys, info) => {
      this.keys = checkedKeys;
      const postDataKeys = convertKeysToPostData(this.keys);

      this.props.apiConfigFn(postDataKeys);
      this.notify('API Config updated');
    }

    clearConfig = () => {
      this.props.apiConfigFn([]);
      this.notify('API Config has been cleared.');
    }

    onCheckRuntimeConfig = (checkedKeys) => {
      // TODO: how to reset the config?
      const keys = this.keys.concat(checkedKeys);
      const postDataKeys = convertKeysToPostData(keys);

      this.props.apiConfigFn(postDataKeys, false);
      this.notify('API Config updated');
    }

    render() {
      return (
        <Card className="main-api-config">
          <Card.Content>
            <Header as='h2'>API Configuration</Header>
            <Header as='h3'>Transaction</Header>
            <Tree
              className=""
              showIcon={false}
              showLine={false}
              checkable
              selectable={false}
              defaultExpandAll
              onExpand={this.onExpand}
              onCheck={this.onCheck}
              treeData={treeDataTransactions}
            />
            <Header as='h3'>Registration</Header>
            <Tree
              className=""
              showIcon={false}
              showLine={false}
              checkable
              selectable={false}
              defaultExpandAll
              onExpand={this.onExpand}
              onCheck={this.onCheck}
              treeData={treeDataRegistrations}
            />

            <Header as='h3'>Runtime Configs</Header>

            <Tree
              className=""
              showIcon={false}
              showLine={false}
              checkable
              selectable={false}
              defaultExpandAll
              onExpand={this.onExpand}
              onCheck={this.onCheckRuntimeConfig}
              treeData={treeDataRuntimeConfig}
            />

            <Button primary content="Reset" onClick={this.clearConfig} />
          </Card.Content>
        </Card>
      );
    }
}

export default APIConfig;
