


import React from 'react';
import axios from 'axios';
import Tree from 'rc-tree';
import PropTypes from 'prop-types';
import 'rc-tree/assets/index.css';
import './APIConfig.css';

const MOCK_API_SERVER = 'http://localhost:8080';

const transactions = [
    {
        key: 'MFA_CHALLENGE',
        children: [
            'GOOGLE_TOTP',
            'OKTA_PUSH',
            'OKTA_SMS',
            'OKTA_CALL',
            'OKTA_EMAIL',
            'OKTA_SECURITY_QUESTION'
        ],
    },
    {
        key: 'MFA_VERIFY',
        children: [
            'OKTA_SMS',
            'OKTA_SECURITY_QUESTION'
        ],
    },
    {
        key: 'SUCCESS'
    },
    {
        key: 'LOCKED_OUT'
    },
    {
        key: 'PASSWORD_EXPIRED'
    },
    {
        key: 'PASSWORD_WARN'
    }
];
//
//
// PASSWORD_RESET
// ,
// RECOVERY,
// RECOVERY_CHALLENGE,
// MFA_ENROLL,
// MFA_ENROLL_ACTIVATE,
// MFA_REQUIRED,

const treeData = transactions.map((obj) => {
    const children = Array.isArray(obj.children) ? obj.children.map((x) => {
        return { key: `${obj.key}--${x}`, title: x };
    }) : [];
    return { key: obj.key, title: obj.key, children };
})

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
        successFn: PropTypes.func,
      };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onCheck = (checkedKeys, info) => {
        this.keys = checkedKeys;
    }

    onSaveConfig = () => {
        const postDataKeys = convertKeysToPostData(this.keys);

        axios.post(`${MOCK_API_SERVER}/config`, {
            config: postDataKeys,
          })
          .then((response) => {
            console.log(response);
            this.props.successFn(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

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
                    treeData={treeData}
                />
                <button onClick={this.onSaveConfig}>Save</button>
            </div>
        );
    }
}

export default APIConfig;
