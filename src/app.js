



import Item from "components/Item"; //每一项todo组件
import Footer from "components/Footer"; //底部footer操作栏

// 引入样式
require('style/base.css');
require('style/index.css');


export default class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            todosData:[ //声明todo的数据结构，存放todo的一个数组，成员是对象，对象有id、value、和状态布尔值
                //3个字段{id,value,hasCompleted},
            ]
        }

        //给所有事件绑定this
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
    }

    //回车输入todo的事件
    handleKeyDownPost(ev)   
    {
        if(ev.keyCode !== 13) return;  //按下的不是回车则返回
        let value  = ev.target.value.trim();    //输入框的值去空格

        if( value ==="" ) return;

        //添加todo
        let todo = {};
        todo.id = new Date().getTime(); //todo的id是唯一的，所以用的时间
        todo.value = value; //值就等于输入框的值
        todo.hasCompleted = false;

        //把当前的todo内容取出
        let {todosData} = this.state;

        //把当前输入框的push进todo
        todosData.push(todo);

        //更新state
        this.setState({
            todosData   //等同于   todosData:todosData
        });

        //清空输入框
        ev.target.value = "";
    }

    //todo上面删除按钮 删除todo事件
    onDestroy( todo )
    {
        let {todosData} = this.state;   //先拿出所有的当前todo
        
        //过滤删除
        todosData = todosData.filter( (elt)=>{
            return elt.id !== todo.id;
        })

        //更新state
        this.setState({
            todosData   //等同于   todosData:todosData
        });

    }

    //footer上面的批量删除完成状态todo的按钮事件
    onClearCompleted()
    {
        let {todosData} = this.state;   //先拿出所有的当前todo

        //过滤删除
        todosData = todosData.filter( (elt)=>{
            return !elt.hasCompleted;    
        })

        //更新state
        this.setState({
            todosData   //等同于   todosData:todosData
        });
    }




    
    render() {

        //先取出上面设置的事件，方便下面使用
        let {handleKeyDownPost,onDestroy,onClearCompleted} = this;

        //拿到state，更新Item
        let {todosData} = this.state;

        let items = null;

        //构造Item
        items = todosData.map((elt, i)=>{      //elt就是我们的todosData的每一项对象
            return (
                <Item 
                    {...{
                        onDestroy,  //每一个todo都有一个关闭按钮，所以传这个事件过去
                        todo:elt    //todo的内容
                    }}

                    key = {i}
                />
            );
        });

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input 
                        type="text" 
                        className="new-todo"
                        onKeyDown = {handleKeyDownPost}
                    />
                </header>
                <section className="main">
                    <input type="checkbox" className="toggle-all" />
                    <ul className="todo-list">
                        {items}
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