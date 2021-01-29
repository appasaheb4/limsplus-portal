import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../../redux/actions/sidebarActions";
import { useHistory } from "react-router-dom";
import Contexts from "@lp/library/stores";

import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  PieChart,
  Settings,
  UserPlus,
} from "react-feather";

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago",
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago",
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago",
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago",
  },
];

const messages = [
  {
    name: "Ashley Briggs",
    avatar: "",
    description: "Nam pretium turpis et arcu. Duis arcu tortor.",
    time: "15m ago",
  },
  {
    name: "Chris Wood",
    avatar: "",
    description: "Curabitur ligula sapien euismod vitae.",
    time: "2h ago",
  },
  {
    name: "Stacie Hall",
    avatar: "",
    description: "Pellentesque auctor neque nec urna.",
    time: "4h ago",
  },
  {
    name: "Bertha Martin",
    avatar: "",
    description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
    time: "5h ago",
  },
];

interface InputProps {
  children: any;
  count?: any;
  showBadge?: any;
  header?: any;
  footer?: any;
  icon?: any;
}

const NavbarDropdown: React.FunctionComponent<InputProps> = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon,
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

interface NavbarItemProps {
  icon: any;
  title?: any;
  description?: any;
  time?: any;
  spacing?: any;
}

const NavbarDropdownItem: React.FunctionComponent<NavbarItemProps> = ({
  icon,
  title,
  description,
  time,
}) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className="pl-2">
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarComponent = ({ dispatch }) => {
  const history = useHistory();
  const rootStore = React.useContext(Contexts.rootStore);
  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline>
        <Input
          type="text"
          placeholder="Search projects..."
          aria-label="Search"
          className="form-control-no-border mr-sm-2"
        />
      </Form>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown>

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>

          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <span className="text-dark">Profile</span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              {/* <DropdownItem>
                <User size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem> */}
              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Analytics
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Settings & Privacy</DropdownItem>
              <DropdownItem>Help</DropdownItem>
              <DropdownItem
                onClick={() => {
                  rootStore.userStore.clearLogin();
                  history.push("/");
                }}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default connect((store) => ({
  app: store.app,
}))(NavbarComponent);
