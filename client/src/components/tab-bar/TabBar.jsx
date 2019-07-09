import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import TabBarNav from './TabBarNav';

import './tab-bar.sass';

class TabBar extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    additionalTabBarElem: PropTypes.node,
  };

  static defaultProps = {
    children: null,
    className: '',
    additionalTabBarElem: null,
  };

  state = {
    activeTab: null,
  };

  componentDidMount() {
    const { children = [] } = this.props;

    const activeTab = this.getChildrenLabels(children)[0].label;

    this.setActiveTab(activeTab);
  }

  getChildrenLabels = children => children.map(({ props }) => ({
    label: props.label,
    icon: props.icon,
  }));

  setActiveTab = activeTab => {
    const { activeTab: currentTab } = this.state;

    if (currentTab !== activeTab) {
      this.setState({
        activeTab,
      });
    }
  };

  renderTabs = () => {
    const { children } = this.props;
    const { activeTab } = this.state;

    return this.getChildrenLabels(children).map(navAttrs => (
      <TabBarNav
        key={shortid.generate()}
        navLabel={navAttrs.label}
        icon={navAttrs.icon}
        className={classNames({ active: activeTab === navAttrs.label })}
        onChangeActiveTab={this.setActiveTab}
      />
    ));
  };

  render() {
    const { activeTab } = this.state;
    const {
      children, className, additionalTabBarElem, ...attrs
    } = this.props;

    const classes = classNames('tab-bar', className);

    return (
      <div className={classes} {...attrs}>
        <div className="tab-bar__header">
          <div className="container">
            <div className="tab-bar__header-container">
              {additionalTabBarElem}
              <div className="tab-bar-nav">{this.renderTabs()}</div>
            </div>
          </div>
        </div>
        <div className="tab-container">
          {React.Children.map(children, child => React.cloneElement(child, { activeTab }))}
        </div>
      </div>
    );
  }
}

export default TabBar;
