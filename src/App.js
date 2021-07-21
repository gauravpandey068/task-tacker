import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

const App = () => {

    const [showAddForm, setShowAddForm] = useState(false)

    const [tasks , setTasks] = useState([])

    useEffect(() => {
        
        const getTasks = async () =>{
            const taskFromServer  = await fetchTasks()
            setTasks(taskFromServer)
        } 
        getTasks()

    }, [])

    //Featch tasks
    const fetchTasks = async () =>{
            const res = await fetch('http://localhost:5000/tasks')
            const data = await res.json()
            
           return data
        }

    //Featch task 
    const fetchTask = async (id) =>{
            const res = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = await res.json()
            
           return data
        }

    //Add Task
    const addTask = async (task) =>{
        // const id = Math.floor(Math.random()*100) +1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
        
    }

    //Delete task
    const deleteTasks = async (id) =>{
        await fetch (`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        console.log('deleting' ,id)
        setTasks(tasks.filter((task)=> task.id !== id))
    }

    //togel reminder

    const toggleReminder = async (id) =>{
        
        const taskToToggle = await fetchTask(id)

        const updatedTask = {...taskToToggle, 
                reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()
        setTasks(tasks.map((task)=> task.id === id ? {
            ...task, reminder: data.reminder
        } : task))
       
    }


    return (
        <Router>
            <div className='container'>
                <Header onAdd={()=>setShowAddForm(!showAddForm) } showAdd={showAddForm}/>
                
                <Route path='/' exact render={(props) =>(
                    <>
                        { showAddForm && <AddTask onAdd= {addTask}/>}
                            {tasks.length>0 ?(
                        <Tasks tasks={tasks} onDelete={deleteTasks} 
                            onChange={toggleReminder}/>)
                            : ('No Task Found!')}
                    </>
                ) }/>
                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    )
}

export default App

