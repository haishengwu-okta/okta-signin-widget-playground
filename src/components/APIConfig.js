


import React from 'react';
import Tree from 'rc-tree';
import PropTypes from 'prop-types';
import 'rc-tree/assets/index.css';
import './APIConfig.css';
import { Header } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const transactions = [
    {
        key: 'MFA_REQUIRED',
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
        key: 'LOCKED_OUT'
    },

    {
        key: 'SUCCESS'
    },

];

// {
//     key: 'PASSWORD_WARN'
// },
// {
//     key: 'PASSWORD_EXPIRED'
// },
//
//
// PASSWORD_RESET
// RECOVERY,
// RECOVERY_CHALLENGE,
//
// MFA_ENROLL,
// MFA_ENROLL_ACTIVATE,
// MFA_REQUIRED,
//
//

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
        apiConfigFn: PropTypes.func,
      };

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    notify = (message) => {
      toast.info(message);
    }

    onCheck = (checkedKeys, info) => {
        this.keys = checkedKeys;
        const postDataKeys = convertKeysToPostData(this.keys);

        this.props.apiConfigFn(postDataKeys);
        this.notify("API Config updated");
    }

    render() {
        return (
            <div className="main-api-config">
                <Header as='h2'>API Configuration</Header>
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
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
              />
            </div>
        );
    }
}

export default APIConfig;
