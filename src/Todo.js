import React, { useState } from 'react'

const TodoApp = () => {

    // Define all state variables
    const [ desc, setDesc ] = useState('')
    const [ todos, setTodos ] = useState([])
    const [ todosBackup, setTodosBackup ] = useState([])
    const [ isCompleted, setIsCompleted ] = useState(false)
    const [ style, setStyle ] = useState('descBody')
    const [ btnText, setBtnText ] = useState('Clear All')
    let [ error, setError ] = useState('')
    const errorAlert = document.getElementById("error-para");
    const hr = document.getElementById("hr");
    const hr2 = document.getElementById("hr2");
    const clearBtn = document.getElementById("clearBtn");

    // Add button functionality.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (desc === '') {
            error = "Can't add empty todo!";
            setError(error)
        } else {
            setDesc('')
            setError('')
            const todoObj = { id: new Date().getTime().toString(), desc, isCompleted }
            setTodos([...todos, todoObj])
            setTodosBackup([...todos, todoObj])
            if (btnText === "Undo") {
                if (desc !== '') {
                    setTodosBackup([...todosBackup, todoObj])
                    setBtnText("Clear All")
                }
            }
        }
    }

    // Mark Complete checkbox functionality
    const handleChange = (e, id) => {
        todos.filter(todo => {
            if (todo.id === id) {
                if (e.target.checked) {
                    todo.isCompleted = true
                    let uniquePara = document.getElementById(id)
                    uniquePara.setAttribute('class', 'isCompleted')
                    error = ''
                    setError(error)
                }
                else {
                    todo.isCompleted = false
                    let uniquePara = document.getElementById(id)
                    uniquePara.setAttribute('class', 'descBody')     
                }
            }
            return ''
        })
    }

    // Remove button functionality
    const removeTodo = (id) => {
        todos.filter(todo => {
            if (todo.id === id) {
                if (!todo.isCompleted) {
                    error = "Can't remove uncompleted todo!"
                    setError(error)
                } else {
                    let tobeRemoved = todos.filter(todo => todo.id !== id);
                    setTodos(tobeRemoved)
                    if (tobeRemoved.length === 0) {
                        setBtnText("Undo")
                        hr2.setAttribute("class", "hide")
                    }
                }
            } 
            return ''
        })
    }

    // Clear All todos functionality
    const clearall = () => {
        if (todos.length !== 0) {
            setTodosBackup(todos)
            setTodos([])
            hr2.setAttribute("class", "hide")
            setBtnText("Undo")
        } else {
            for (const todoclear of todosBackup) {
                todoclear.isCompleted = false
            }
            setTodos(todosBackup)
            setBtnText("Clear All")
        }
    }

    // Create Todo object
    const todObj = todos.map((todo) => {
        const { id, desc, isCompleted } = todo;
        return <div key={id} className="body">
            <input 
                type="checkbox" 
                id="isCompleted" 
                name="isCompleted" 
                value={isCompleted} 
                onChange={(e)=> handleChange(e, id)}/>
        
            <p id={id} className={style}>{desc}</p>
            
            <button 
                className="btn-prim2"
                type="submit" 
                onClick={()=> removeTodo(id)}
            > x </button>
        </div>
    })

    // Conditional error rendering logic
    if (error !== '') {
        errorAlert.setAttribute("class", "showError")
        hr.setAttribute("class", "hr")
        hr2.setAttribute("class", "hr")
    } 
    if (desc !== '') {
        hr.setAttribute("class", "hide")
        errorAlert.setAttribute("class", "hide")
    }
    if (todos.length !== 0) {
        hr.setAttribute("class", "hr")
        hr2.setAttribute("class", "hr")
        clearBtn.setAttribute("class", "btn-sec")
    }
    if (btnText === "Undo") {
        if (desc !== '') {
            hr.setAttribute("class", "hr")
        }
    }

    // App renders
    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="desc" 
                    name="desc"
                    value={desc}
                    onChange={(e)=> setDesc(e.target.value)}
                />
            
                <button 
                    className="btn-prim"
                    type="submit"> Add
                </button>
            </form>

            <hr id="hr" className="hide" />

            <p id="error-para" className="hide">{error}</p>

            {todObj}

            <hr id="hr2" className="hide" />

            <button id="clearBtn" className="hide" onClick={()=>clearall()}>{btnText}</button>
        </>
    )
}

export default TodoApp;