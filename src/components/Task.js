import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Task = (props) => {
    return (
        //change css class according to reminder data
        <div className={`task ${props.task.reminder ? 'reminder' : ''}`} 
            onDoubleClick={()=> props.onChange(props.task.id)}>
            <h3>{props.task.text} 
            <FaTimes style= {{ color: 'red', cursor: 'pointer'}} 
            onClick={()=> props.onDelete(props.task.id)}/>
            </h3>   
            <p>{props.task.date}</p>     
        </div>
    )
}


export default Task
