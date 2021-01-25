import React from "react";
import { connect } from "react-redux";

import { toggleBoxedLayout } from "../../redux/actions/layoutActions";
import { toggleStickySidebar } from "../../redux/actions/sidebarActions";
import { toggleSidebar } from "../../redux/actions/sidebarActions";

import { Badge, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Settings as SettingsIcon } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

type Props = { layout; sidebar; dispatch };
type State = { isOpen: boolean };

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggleSidebar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    //  this.wrapperRef = node;
  }

  handleClickOutside(event) {
    // if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    //   this.setState({ isOpen: false });
    // }
  }

  render() {
    const { isOpen } = this.state;
    const { layout, sidebar, dispatch } = this.props;

    return (
      <div
        ref={this.setWrapperRef}
        className={"settings " + (isOpen ? "open" : "")}
      >
        <div className="settings-toggle" onClick={() => this.toggleSidebar()}>
          <SettingsIcon />
        </div>

        <div className="settings-panel">
          <div className="settings-content">
            <PerfectScrollbar>
              <div className="settings-title">
                <Button close onClick={() => this.toggleSidebar()} />

                <h4>Settings</h4>
              </div>

              <div className="settings-section">
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                  Layouts
                </small>

                <ul className="settings-layouts">
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleStickySidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isSticky ? "Static Sidebar" : "Sticky Sidebar"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleSidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isOpen ? "Collapsed Sidebar" : "Visible Sidebar"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleBoxedLayout(), this.toggleSidebar())
                      }
                    >
                      {layout.isBoxed ? "Full Layout" : "Boxed Layout"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>
                </ul>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((store) => ({
  layout: store.layout,
  sidebar: store.sidebar,
}))(Settings);
