


import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
import './APIConfig.css';

const transactions = [
    {
        key: 'MFA_CHALLENGE',
        children: [
            'GOOGLE_OTP',
            'OKTA_PUSH',
            'OKTA_SMS',
            'OKTA_CALL',
            'OKTA_EMAIL',
            'SECURITY_QUESTION'
        ],
    },
    {
        key: 'MFA_VERIFY',
        children: [
            'OKTA_SMS',
            'SECURITY_QUESTION'
        ],
    },
    {
        key: 'SUCCESS'
    }
];
// LOCKED_OUT
// PASSWORD_EXPIRED
// PASSWORD_RESET
// PASSWORD_WARN,
// RECOVERY,
// RECOVERY_CHALLENGE,
// MFA_ENROLL,
// MFA_ENROLL_ACTIVATE,
// MFA_REQUIRED,




class APIConfig extends React.Component {
    // static propTypes = {
    //     keys: PropTypes.array,
    // };
    // static defaultProps = {
    //     keys: [],
    // };
    constructor(props) {
        super(props);
        this.treeData = transactions.map((obj) => {
            const children = Array.isArray(obj.children) ? obj.children.map((x) => {
                return { key: `${obj.key}_${x}`, title: x };
            }) : [];
            return { key: obj.key, title: obj.key, children };
        })

        this.state = {
        };
    }
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    render() {

        return (
            <div className="main-api-config">
                <h2>API Configuration</h2>
                <Tree
                    className="myCls"
                    showIcon={false}
                    showLine={false}
                    checkable
                    selectable={false}
                    defaultExpandAll
                    onExpand={this.onExpand}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
                <button>Save</button>
            </div>
        );
    }
}

export default APIConfig;
