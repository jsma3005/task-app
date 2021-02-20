import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../API';
import Card from '../../components/Card/Card';
import TaskForm from '../../components/TaskForm';
import { loginAction, logoutAction } from '../../Redux/actions/authActions';
import cls from './Main.module.scss';

const Main = () => {
    const [data, setData] = useState([]);
    const [dataState, setDataState] = useState(0);
    const [page, setPage] = useState(1);
    const [totalTaskCount, setTotalTaskCount] = useState(0);
    const [sortField, setSortField] = useState('username');
    const [sortDirection, setSortDirection] = useState('asc');
    const dispatch = useDispatch();

    useEffect(() =>{
        if(localStorage.getItem('taskApp')){
            dispatch(loginAction({
                isLogin: true,
                token: localStorage.getItem('taskApp')
            }))
        }else{
            dispatch(logoutAction({
                isLogin: false,
                token: null
            }))
        }

        getTasks({
            developer: 'Urmat',
            page,
            sort_field: sortField,
            sort_direction: sortDirection
        })
        .then(res => {
            if(res.data.status === "ok"){
                setTotalTaskCount(+res.data.message.total_task_count);
                setData(res.data.message.tasks);
            }
        })
        .catch(() =>{
            setData([]);
        })
    }, [setData, dataState, page, sortField, sortDirection, dispatch])

    const handleNextPage = e => {
        e.preventDefault();
        setPage(prev => prev + 1);
    }

    const handlePrevPage = e => {
        e.preventDefault();
        if(page > 1){
            setPage(prev => prev - 1)
        }
    }

    const handleChangeSortField = e => {
        setSortField(e.target.value)
    }

    const handleChangeSortDirection = e => {
        setSortDirection(e.target.value)
    }
    

    return (
        <div className={`${cls.root} p-5`}>
            <div className="row">
                <div className="col-lg-8">
                    {
                        data.length === 0 ? 
                            <div className="text-center">
                                Loading...
                            </div>
                        : 
                        <>
                            <div className={cls.sorting}>
                                <h5>Sorting by: </h5>
                                <select value={sortField} onChange={handleChangeSortField} className="form-control">
                                    <option value="username">Username</option>
                                    <option value="email">Email</option>
                                    <option value="status">Status</option>
                                </select>
                                <select value={sortDirection} onChange={handleChangeSortDirection} className="form-control">
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    data.map(({id, username, email, text, status}) => (
                                        <div key={id} className="col-lg-6 mb-4">
                                            <Card id={id} username={username} email={email} text={text} status={status} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="text-center">
                                <button disabled={page > 1 ? false : true} onClick={handlePrevPage} className="btn btn-danger">Prev</button>
                                <span className="m-3">{page}</span>
                                <button disabled={(page * 3) >= totalTaskCount ? true : false} onClick={handleNextPage} className="btn btn-success">Next</button>
                            </div>
                        </>
                    }
                </div>
                <div className="col-lg-4">
                    <TaskForm changeState={setDataState} />
                </div>
            </div>
        </div>
    )
}

export default Main