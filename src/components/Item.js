

//接收的数据的数据验证
let propTypes = {
    todo:PT.object,   //因为我在webpack.config内已经申明好了pt，所以可以直接用PT
    onDestroy:PT.func,
    onToggle:PT.func
}

export default class Item extends React.Component {
    constructor(props)
    {
        super(props);
       
    }
    
    render() {
        
        //取出todo
        let {onDestroy,todo,onToggle} = this.props;

        return (
            <li>
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked={todo.hasCompleted}
                        onChange={()=>{onToggle(todo)}}
                    />
                    <label>
                        {todo.value}
                    </label>
                    <button className="destroy"
                        onClick = { ev=>{onDestroy(todo)} }
                    ></button>
                </div>
                <input type="text" className="edit" />
            </li>
        );
    }
}


//绑定数据验证到Item上
Item.propTypes = propTypes;