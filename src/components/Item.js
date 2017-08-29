

//接收的数据的数据验证
let propTypes = {
    todo:PT.object,   //因为我在webpack.config内已经申明好了pt，所以可以直接用PT
    onDestroy:PT.func,
    onToggle:PT.func,
    itemEditDone:PT.func
}

export default class Item extends React.Component {

    constructor(props)
    {
        super(props);
       
        //让Item可编辑，我们设置一个state来操作
        this.state = {
            inEdit:false,
            val:''
        }
        //绑定this
        this.onEdit = this.onEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.itemEditDone = this.itemEditDone.bind(this);
        this.inputChange = this.inputChange.bind(this);

        this.isEsc = false; //用于onBlur onEnter 方法
    }

    //事件回调函数，让state的inEdit改变布尔值
    onEdit()
    {
        //实现取出当前todo的value
        let {value} = this.props.todo;

        this.setState({
            inEdit:true,
            val:value
        },()=>{
            this.refs.editInput.focus()
        });
    }

    //修改item的事件   失去焦点和按下回车时改变todo的value
    onBlur(){
        if(this.isEsc === true) {this.isEsc=false; return;}
        this.itemEditDone();
    }
    onEnter(ev){
        if(ev.keyCode === 27){
            this.isEsc = true;
            //console.info(this.isEsc);
            this.setState({inEdit:false});//让输入框消失
            return;
        }
        if(ev.keyCode !== 13) return;
        this.itemEditDone();
    }
    itemEditDone()
    {
        //让输入框消失
        this.setState({inEdit:false});
        //开始保存修改的todo内容
        let {itemEditDone,todo} = this.props;   //取出传递进来的itemEditDone函数,todo
        itemEditDone(todo,this.state.val);
    }

    //定义一个修改本组件state的val的函数,用于受控组件值的修改
    inputChange(ev)
    {
        this.setState({val:ev.target.value});
    }


    
    render() {

        
        
        //取出todo
        let {onDestroy,todo,onToggle} = this.props;

        let {inEdit,val} = this.state;

        //定义一个className类名变量去控制li的class
        let itemClassName = todo.hasCompleted?"completed":"";

        //取出双击onEdit事件
        let {onEdit,onBlur,onEnter,inputChange} = this;

        //console.info(this.isEsc);

        if(inEdit){
            itemClassName += 'editing';
        }

        return (
            <li className={itemClassName} >
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked={todo.hasCompleted}
                        onChange={()=>{onToggle(todo)}}
                    />
                    <label
                        onDoubleClick = {onEdit}
                    >
                        {todo.value}
                    </label>
                    <button className="destroy"
                        onClick = { ev=>{onDestroy(todo)} }
                    ></button>
                </div>
                <input 
                    type="text" 
                    className="edit" 
                    value={val}
                    onBlur={onBlur}
                    onKeyDown={onEnter}
                    onChange={inputChange}
                    ref="editInput"
                />
            </li>
        );
    }
}


//绑定数据验证到Item上
Item.propTypes = propTypes;