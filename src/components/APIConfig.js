


import React from 'react';
import Tree from 'rc-tree';
import PropTypes from 'prop-types';
import 'rc-tree/assets/index.css';
import './APIConfig.css';
import { Header, Card } from 'semantic-ui-react'

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
            'OKTA_SECURITY_QUESTION'
        ],
    },
    {
        key: 'LOCKED_OUT'
    },
    {
        key: 'PASSWORD_EXPIRED'
    },
    {
        key: 'PASSWORD_WARN'
    },
    {
        key: 'PASSWORD_RESET'
    },
    {
        key: 'RECOVERY_CHALLENGE'
    },
    {
        key: 'RECOVERY'
    },
    {
        key: 'SUCCESS'
    },
    {
        key: 'UNLOCK'
    },
];

const registrations = [
    { key: 'schema' },
    { key: 'register' },
]


//
//
// MFA_CHALLENGE,
// MFA_ENROLL,
// MFA_ENROLL_ACTIVATE,
// CONSENT_REQUIRED
//

const convertToTreeData = (obj) => {
    const children = Array.isArray(obj.children) ? obj.children.map((x) => {
        return { key: `${obj.key}--${x}`, title: x };
    }) : [];
    return { key: obj.key, title: obj.key, children };
};
const treeDataTransactions = transactions.map(convertToTreeData);
const treeDataRegistrations = registrations.map(convertToTreeData);

const convertKeysToPostData = (keys) => {
    const result = {};
    keys.forEach((key) => {
        if (key.indexOf('--') > 0) {
            const [parent, child] = key.split('--');
            if (!result[parent]) {
                result[parent] = { key: parent, children: [] };
            }
            result[parent].children.push(child);
        } else {
            result[key] = { key, children: [] };
        }
    })
    return Object.values(result);
}

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
        this.notify("API Config updated");
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
                </Card.Content>
            </Card>
        );
    }
}

export default APIConfig;
