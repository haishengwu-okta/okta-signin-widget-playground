


import React from 'react';
import PropTypes from 'prop-types';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

const Transactions = [
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



const treeData = Transactions.map((obj) => {
    const children = Array.isArray(obj.children) ? obj.children.map((x) => {
        return { key: x, title: x };
    }) : [];
    return { key: obj.key, title: obj.key, children};
})

class APIConfig extends React.Component {
  static propTypes = {
    keys: PropTypes.array,
  };
  static defaultProps = {
    keys: ['0-0-0-0'],
  };
  constructor(props) {
    super(props);
    const keys = props.keys;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  }
  onExpand = (expandedKeys) => {
    // console.log('onExpand', expandedKeys, arguments);
  };
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  render() {

    return (
      <div style={{ margin: '0 20px' }}>
        <Tree
          className="myCls"
          showLine
          checkable
          selectable={ false }
          defaultExpandAll
          onExpand={this.onExpand}
        //   defaultSelectedKeys={this.state.defaultSelectedKeys}
        //   defaultCheckedKeys={this.state.defaultCheckedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
          treeData={treeData}
        />
      </div>
    );
  }
}

export default APIConfig;
