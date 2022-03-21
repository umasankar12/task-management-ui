import "./App.css";
import "./assets/styles.css";

import {Component, useState} from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskEdit from "./components/TaskEdit";
import tasks from "./components/Tasks";

class App extends Component {
    state = {
        tasks:[],
        showTaskEdit: false,
        display:'none',
        taskError:{},
        lastTask:{},
        baseUrl:""

    };

    refreshTask=() =>{
        fetch(this.state.baseUrl+"/tms/task/mytasks/Umasankar", {
            mode: 'cors'
        })
            .then((resp) => resp.json())
            .then((data) => this.setState({ tasks: data }, () => {console.log("result =", this.state.tasks);}));
    }
    componentDidMount() {
        console.log({ REACT_APP_API_ENDPOINT: process.env.REACT_APP_CONFIG_MODE })
        if(process.env.REACT_APP_CONFIG_MODE){
            this.setState({baseUrl:"http://localhost:8080"});
        }else {
            this.setState({baseUrl:"http://129.153.3.10:8080"});
        }
        console.log("BaseURl is :"+this.state.baseUrl)
        this.refreshTask();
    }

    onTglStatus = (task) => {
        console.log("completing task");
        fetch(this.state.baseUrl+"/tms/task/close", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify(task),
        })
            .then((resp) => resp.json())
            .then(result => {
                console.log(result);
                this.setState({showTaskEdit:false});
                this.refreshTask();
            });
    };

    openNewTask = () => {
       this.setState({showTaskEdit:!this.state.showTaskEdit});
        
    }
    onSaveTask = (desc, date) =>{
        const inputOrder = {
            shortDesc: desc,
            longDesc: "New assigned task is "+desc,
            targetDate:date,
            createdBy: "Umasankar",
            status: "open"
        };
        console.log(JSON.stringify(inputOrder))
        fetch(this.state.baseUrl+"/tms/task/create", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify(inputOrder),
        })
            .then((resp) => resp.json())
            .then(result => {
                console.log(result);
                this.setState({showTaskEdit:false});
                this.refreshTask();
            });
    };

    render() {
        let showTaskEdit = this.state.showTaskEdit;
        return (
            <div className="App">
                <Header></Header>
                <div className="container">
                    <div className="col-12 text-right">
                        <button
                            className="button outline" onClick={this.openNewTask}>
                            {!this.state.showTaskEdit && "New"}
                            {this.state.showTaskEdit && "➖"}
                        </button>
                    </div>
                    {this.state.showTaskEdit && <TaskEdit task={{}} onSaveTask={this.onSaveTask}/>}
                    <Tasks tasks={this.state.tasks} onTglStatus={this.onTglStatus}></Tasks>
                </div>
            </div>
        );
    }
}
export default App;

