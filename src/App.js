import cls from './App.module.scss';
import { Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import NavBar from './components/NavBar';
import Auth from './pages/Auth/Auth';
import { Provider } from 'react-redux';
import store from './Redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <div className={cls.root}>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/auth" component={Auth} />
                </Switch>
            </div>
        </Provider>
    )
}
export default App;