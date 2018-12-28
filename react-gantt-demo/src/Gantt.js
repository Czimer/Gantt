/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js';
import './Gantt.css';

export default class Gantt extends Component {
  setZoom(value){
    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
    const days = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];

    switch (value){
      case 'שעות':
        gantt.config.scale_unit = 'day';
        gantt.templates.date_scale  = function(date){
              return `${days[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}`;
        }
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 60;
        gantt.config.subscales = [
          {unit:'hour', step: 1, date:'%H:00'}
        ];

        break;
      case 'ימים':
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "שבוע %w";
        var scaleDateToString = gantt.date.date_to_str(gantt.config.date_scale)
        gantt.templates.date_scale  = function(date){
          return scaleDateToString(date);
        }; 
        gantt.config.min_column_width = 70;
        gantt.config.scale_height = 60;
        const dateToHebrew = function(date){
          return `${days[date.getDay()]} ${date.getDate()}.${date.getMonth() + 1}`;
        };
        
        gantt.config.subscales = [
          {unit: "day", step: 1, template: dateToHebrew}
        ];

        break;
      default:
        break;
    }

    
      var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: "Today: " + date_to_str(today)
      });

  }


  shouldComponentUpdate(nextProps){
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidUpdate() {
    gantt.render();
  }

  ganttSettings() {
    // Gantt rtl
    gantt.config.rtl = true;
        gantt.config.layout = {
            css: "gantt_container",
            rows: [
                {
                    cols: [
                        {view: "scrollbar", id: "scrollVer"},
                        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                        {resizer: true, width: 1},
                        {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
                    ]
                },
                {view: "scrollbar", id: "scrollHor", height: 20}
            ]
        };

    // List columns
    gantt.config.columns = [
      { name:"text",  label:"איסוף", tree:true, align: "right", width:'*' }
    ];

    // Gantt task text
    gantt.templates.task_text = function(start, end, task){
      return `<span class="gridTaskWeapon">${task.ganttData.weapon}&nbsp</span>
              <span class="gridTaskPlat">${task.ganttData.plat}</span>`;
    };

    // Personal gantt settings
    gantt.config.readonly = true;
    gantt.config.inherit_scale_class = true;
    gantt.config.row_height = '50';
    gantt.config.start_on_monday = false;

    // Css settings of gantt task - depends of the type
    gantt.templates.task_class = function (start, end, task) {
       let className;

       if (!task.toShow) {
          className = "gridTaskHidden";
       }
       else if (task.ganttData.plat === "כבד") {
         className = "gridTaskHeavy";
       }
       else {
         className = "gridTaskSmooth"
       }

       return (className);
    }

    // Css settings
    gantt.templates.grid_header_class = () => "taskListHeader";
    gantt.templates.scale_cell_class = () => "scale";

    // Tooltip text customize
    gantt.templates.tooltip_text = function(start,end,task){
        let tooltipLabels = new Array(); 
        tooltipLabels = [{ 'label': 'שדה 1', 'labelField': 'ערך 1' }, 
                         { 'label': 'שדה 2', 'labelField': 'ערך 2'}, 
                         { 'label': 'שדה 3', 'labelField': 'ערך 3'}];
        
        if (!task.toShow)
        {
          return ``;
        }

        return `<div class="tooltip">
                  ${tooltipLabels.map(label => `<b>${label['label']}: </b>${label['labelField']}<br/>`).join('')}
                </div>`
    };
  }

  initGanttEvents() {
    if(gantt.ganttEventsInitialized){
      return;
    }
    gantt.ganttEventsInitialized = true;

    gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'inserted', task);
      }
    });

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'updated', task);
      }
    });

    gantt.attachEvent('onAfterTaskDelete', (id) => {
      if(this.props.onTaskUpdated) {
        this.props.onTaskUpdated(id, 'deleted');
      }
    });

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'inserted', link);
      }
    });

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'updated', link);
      }
    });

    gantt.attachEvent('onAfterLinkDelete', (id, link) => {
      if(this.props.onLinkUpdated) {
        this.props.onLinkUpdated(id, 'deleted');
      }
    });
  }
  
  componentDidMount() {
    this.initGanttEvents();
    this.ganttSettings();
    gantt.init(this.ganttContainer);
    gantt.parse(this.props.tasks);
  }

  render() {
    this.setZoom(this.props.zoom);

    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}