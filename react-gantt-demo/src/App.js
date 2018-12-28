import React, { Component } from 'react';
import Gantt from './Gantt';
import Toolbar from './Toolbar';
import './App.css';
import * as api from '../utils/api.js';

const data = {
    data: [
        {id : 1, ganttData: { customer: "צרכן אב 1" }, toShow: false},
        {id : 2, start_date: '31-12-2018 08:00', end_date: '31-12-2018 13:30', ganttData: { name: "משימה 1", customer: "צרכן 1", ok: "123", flight: "999", sensor: "סנסור1", plat: "כבד", weapon: "לידוי", phone: "087-73534" } , parent: 1, toShow: true},
        {id : 3, start_date: '30-12-2018 08:00', end_date: '30-12-2018 03:30', ganttData: { name: "משימה 2", customer: "צרכן 2", ok: "123", flight: "999", sensor: "סנסור1", plat: "חלק", weapon: "אסטמה", phone: "087-73534" }, parent: 1, toShow: true},
        {id : 4, ganttData: { customer: "צרכן אב 2" }, toShow: false},
        {id : 5, start_date: '01-01-2019 08:00', end_date: '01-01-2019 16:30', ganttData: { name: "משימה 1", customer: "צרכן 1", ok: "123", flight: "999", sensor: "סנסור1", plat: "כבד", weapon: "שקד", phone: "087-73534" }, parent: 4, toShow: true}
    ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      currentZoom: 'ימים'
    };

    this.handleZoomChange = this.handleZoomChange.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  updateData() {
    data = api.getData();
    data.data.map(x => x.text = `<span class="listTaskCustomer">${x.ganttData.customer}&nbsp</span>
                                 <span class="listTaskName">${x.ganttData.name != null ? x.ganttData.name : ''}</span>`);
    this.setState(() => {
      return { data: data }
    })

    console.log(data);
  };

  handleZoomChange(zoom) {
    this.setState({
      currentZoom: zoom
    });
  }  
  
  render() {
    return (
      <div>
        <Toolbar
            zoom={this.state.currentZoom}
            onZoomChange={this.handleZoomChange}
        />
        <div className="gantt-container">
          { !this.state.data ? 
          <p></p> : 
          <Gantt
            tasks={this.state.data}
            zoom={this.state.currentZoom}
            onTaskUpdated={this.logTaskUpdate}
            onLinkUpdated={this.logLinkUpdate}
          /> }
        </div>
      </div>
    );
  }
}
export default App;
