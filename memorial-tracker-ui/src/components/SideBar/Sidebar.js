import React from "react";
import axios from "axios";
import { MapCenterContext } from "../../containers/App";
import Memorial from "./Memorial/Memorial";
import styles from "./Sidebar.module.css";
import { getCoordinatesOfMemorial } from "../../utils/utils";
import { Drawer, DatePicker, Space, Select, Input} from "antd";

class Sidebar extends React.Component {
  state = {
    lastClickedCoordinates: {
      lat: 0,
      lng: 0,
    },
    types: [],
    visible: false,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/types`)
      .then((response) => {
        let memorialTypes = [];
        if (response.data.length > 0) {
          memorialTypes = response.data;
        }
        this.setState({
          types: memorialTypes,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSidebarClick = (memorialId) => {
    let coordinates = { lat: 0, lng: 0 };
    this.props.Memorials.forEach((memorial) => {
      if (memorial.Id === memorialId) {
        coordinates = getCoordinatesOfMemorial(memorial);
        this.setState({
          lastClickedCoordinates: coordinates,
        });
      }
    });
    this.props.onSidebarClick(coordinates);
    this.props.showDrawer();
  };
  
  onClose = () => {
    this.props.showDrawer();
  };

  render() {
    const { RangePicker } = DatePicker;
    return (
      <Drawer
        bodyStyle={{ padding: 0 }}
        placement="right"
        closable={false}
        visible={this.props.showSidebar}
        mask={true}
        onClose={this.onClose}
      >
        <Space direction="vertical" size={'middle'}>
          <Input
            onChange={(event) => this.props.searchHandler(event.target.value, "NAME")}
            className={styles.SearchInput}
            type="text"
            placeholder="Filter by name"
            size={"large"}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by type"
            className={styles.selectTypes}
            optionFilterProp="children"
            onChange={(event) => this.props.searchHandler(event, "TYPE")}
            showSearch={true}
            size={"large"}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.types.map((type) => (
              <Select.Option value={type.Name} key={type.Id}>
                {type.Name}
              </Select.Option>
            ))}
          </Select>
          <Space direction="vertical" size={12}>
            <RangePicker 
              size={"large"} 
              allowClear={true} 
              onChange={(event) => this.props.searchHandler(event, "DATE")}
            />
          </Space>
        </Space>
        <MapCenterContext.Provider value={this.state.lastClickedCoordinates}>
          <div className={styles.memorialWrapper}>
            {this.props.Memorials.map((memorial) => {
              return (
                <Memorial
                  key={memorial.Id}
                  Id={memorial.Id}
                  Name={memorial.Name}
                  Type={memorial.Type}
                  hide={memorial.hideIcon}
                  onSidebarClick={this.onSidebarClick}
                />
              );
            })}
          </div>
        </MapCenterContext.Provider>
      </Drawer>
    );
  }
}

export default Sidebar;
