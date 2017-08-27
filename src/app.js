



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
            ],
            inputVal:'' //用于改变input为受控组件时获取输入的值
        }

        //给所有事件绑定this
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.toggleAll = this.toggleAll.bind(this);

    }

    //回车输入todo的事件
    handleKeyDownPost(ev)   
    {
        if(ev.keyCode !== 13) return;  //按下的不是回车则返回

        //let value  = ev.target.value.trim();    //输入框的值去空格
        //从真实dom的value的写法换成从state得到：（当input修改成了受控组件时用此方式）
        let {inputVal} = this.state;
        let value  = inputVal.trim();

        if( value ==="" ) return;

        //添加todo
        let todo = {};
        todo.id = new Date().getTime(); //todo的id是唯一的，所以用的时间
        todo.value = value ; //值就等于输入框的值
        todo.hasCompleted = false;

        //把当前的todo内容取出
        let {todosData} = this.state;

        //把当前输入框的push进todo
        todosData.push(todo);

        //更新state
        this.setState({
            todosData,   //等同于   todosData:todosData
            inputVal:''      //清空输入框
        });

        //清空输入框
        //ev.target.value = "";  //注释了，修改为了清空state的inputVal值

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

    //input修改为受控组件后绑定的事件，监测并获取输入值
    inputChange(ev)
    {
        this.setState({
            inputVal:ev.target.value 
        });
    }

    toggleAll(ev)
    {
        let {checked} = ev.target;  //得到真实dom的checked属性值

        let {todosData} = this.state;

        todosData = todosData.map(elt=>{
            elt.hasCompleted = checked;
            return elt; //不return出去会返回undefined 小心犯的错
        });

        this.setState({
            todosData
        })
    }

    onToggle( todo )
    {
        let {todosData} = this.state;

        todosData = todosData.map(elt=>{

            if( elt.id === todo.id){
                elt.hasCompleted = !elt.hasCompleted;   //选择状态取反
            }
            
            return elt;
        });

        this.setState({
            todosData
        })
        console.info(todo.id);
    }


    
    render() {

        //先取出上面设置的事件，方便下面使用
        let {handleKeyDownPost,onDestroy,onClearCompleted,inputChange,toggleAll,onToggle} = this;

        //拿到state，更新Item
        let {todosData,inputVal} = this.state;

        let items = null,
            footer = null,
            itemsBox = null;

        //声明统计未完成的变量
        let leftCount = todosData.length;

        //构造Item
        items = todosData.map((elt, i)=>{      //elt就是我们的todosData的每一项对象

            //遍历是否勾选 只要是完成的，那么上面变量leftCount就--
            if(elt.hasCompleted) leftCount--;
            return (
                <Item 
                    {...{
                        onDestroy,  //每一个todo都有一个关闭按钮，所以传这个事件过去
                        todo:elt,    //todo的内容
                        onToggle
                    }}

                    key = {i}   //这个别忘了哦，不然会报错，遍历都要加，react内部机制diff算法会用
                />
            );
        });

        //有todo时才显示Footer组件/全选checkbox及todo框
        if(todosData.length)
        {
            itemsBox = (
                <section className="main">
                    <input 
                        type="checkbox" 
                        className="toggle-all" 
                        checked={leftCount===0}
                        onChange={toggleAll}
                    />
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
            );
            footer = (
                <Footer
                    {...{
                        leftCount,
                        showClearButton: leftCount < todosData.length,   //判断并显示clear all completed按钮，剩余的小于总数，说明有被勾选为completed，则显示。
                        onClearCompleted
                    }}
                />
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input 
                        type="text" 
                        className="new-todo"
                        value={inputVal}
                        onChange={inputChange}
                        onKeyDown = {handleKeyDownPost}
                    />
                </header>
                {itemsBox}
                {footer}
                
                
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
    ()=>{console.log("zouyang的第一个todo例子渲染完成啦...")}
);

if(module.hot)
{
    module.hot.accept();
}