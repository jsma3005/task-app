import { useState } from 'react';
import { useSelector } from 'react-redux';
import { editTask } from '../../API';
import cls from './Card.module.scss';

const Card = ({username, email, text, status, id}) => {
    const { isLogin, token } = useSelector(s => s.auth);
    const [isEditedText, setIsEditedText] = useState(false);
    const [isEditedStatus, setIsEditedStatus] = useState(false);
    const [changedText, setChangedText] = useState(text);

    const handleChangeText = e => {
        setChangedText(e.target.value);
        setIsEditedText(true);
    }

    const competeTask = e => {
        setIsEditedStatus(e.target.checked);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let statusState;

        if(isLogin){
            if(!isEditedStatus && isEditedText){
                statusState = 1;
            }else if(isEditedStatus && !isEditedText){
                statusState = 10;
            }else if(isEditedStatus && isEditedText){
                statusState = 11;
            }else{
                statusState = 0;
            }
    
            const bodyFormData = new FormData();
            bodyFormData.append('text', changedText.trim());
            bodyFormData.append('status', statusState);
            bodyFormData.append('token', token)
    
            editTask(
                id, 
                bodyFormData, 
                {
                    developer: 'Urmat',
                }
            ).then(res => {
                alert('Edited successfully!');
            })
        }else{
            alert('Something went wrong...')
            window.location.reload();
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <p className="mb-2 text-muted">{email}</p>
                {
                    isLogin ? (
                        <textarea value={changedText} onChange={handleChangeText} className="form-control mb-3">{changedText}</textarea>
                    ) : (
                        <p className={`${cls.text} ${text.length > 200 ? cls.longText : null}`}>{text}</p>
                    )
                }
                <p><span className="text-muted">Status:</span> {status === 10 ? 'completed!' : status === 11 ? 'completed' : 'not completed!'} {
                    status === 0 ? null : status === 10 ? null : (
                        <span className="text-muted mb-0"><small>Edited by admin</small></span>
                    )
                } </p>
            </div>
            {
                isLogin ? (
                    <div className="card-footer">
                        <div className="custom-control custom-switch">
                            <input defaultChecked={status === 10 ? true : status === 11 ? true : false} onChange={competeTask} type="checkbox" className="custom-control-input" id={`completeTask-${id}`} />
                            <label className="custom-control-label" htmlFor={`completeTask-${id}`}>Complete the task</label>
                        </div>
                        <div className="text-center">
                            <button onClick={handleSubmit} disabled={isEditedText ? false : isEditedStatus ? false : true} className="btn btn-primary mt-2">Edit</button>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Card;