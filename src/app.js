



import Item from "components/Item";
import Footer from "components/Footer";

// 引入样式
require('style/base.css');
require('style/index.css');


export default class App extends React.Component {
    constructor(props)
    {
        super(props);

    }
    
    render() {
        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" className="new-todo"/>
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" />
                    <ul className="todo-list">
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                    </ul>
                </section>
                <Footer/>
            </div>
        );
    }
}




ReactDOM.render(
    <App/>,
    document.getElementById('root'),
    ()=>{console.log("渲染完成...")}
);

if(module.hot)
{
    module.hot.accept();
}