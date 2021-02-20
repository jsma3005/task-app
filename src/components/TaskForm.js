import { useState } from "react";
import { createTask } from "../API";

const TaskForm = ({changeState}) =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const createNewTask = e =>{
        e.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append('username', username.trim());
        bodyFormData.append('email', email.trim());
        bodyFormData.append('text', text.trim());

        if(username !== '' && email !== '' && text !== ""){
            createTask(bodyFormData)
            .then(res => {
                changeState(res.data.message.id);
                setUsername('');
                setEmail('');
                setText('');
                alert('Created successfully!')
            })
        }else{
            alert('All fields must be filled!')
        }
    }

    const handleFillUsername = e =>{
        setUsername(e.target.value);
    }

    const handleFillEmail = e =>{
        setEmail(e.target.value)
    }

    const handleFillText = e =>{
        setText(e.target.value);
    }

    return(
        <div className="card">
            <div className="card-header">
                <h6 className="mb-0 card-title text-center">Create a new task</h6>
            </div>
            <div className="card-body">
                <form onSubmit={createNewTask}>
                    <div className="form-group">
                        <input value={username} onChange={handleFillUsername} className="form-control" type="text" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input value={email} onChange={handleFillEmail} className="form-control" type="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <textarea value={text} onChange={handleFillText} className="form-control" type="text" placeholder="Text"></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm;