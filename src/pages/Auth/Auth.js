import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../API';
import cls from './Auth.module.scss';
import { loginAction } from '../../Redux/actions/authActions';
import { useHistory } from 'react-router-dom';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAuth = e =>{
        e.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append('username', username.trim());
        bodyFormData.append('password', password.trim());

        if(username !== "" && password !== ""){
            login(bodyFormData)
            .then(res => {
                if(res.data.status === "ok"){
                    setUsername('');
                    setPassword('');
                    dispatch(loginAction({
                        isLogin: true,
                        token: res.data.message.token
                    }))
                    localStorage.setItem('taskApp', res.data.message.token);
                    history.push('/');
                }else{
                    alert(res.data.message.password);
                }
                
            })
        }else{
            alert('All fields must be filled!')
        }
    }

    const handleFillUsername = e =>{
        setUsername(e.target.value);
    }

    const handleFillPassword = e =>{
        setPassword(e.target.value);
    }

    return (
        <div className={cls.root}>
            <div className={cls.card + ' card'}>
                <div className="card-header">
                    <h5 className="card-title mb-0 text-center">Authorization</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleAuth}>
                        <div className="form-group">
                            <input value={username} onChange={handleFillUsername} className="form-control" type="text" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input value={password} onChange={handleFillPassword} className="form-control" type="password" placeholder="Password" />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;