


//接收的数据的数据验证
let propTypes = {
    leftCount:PT.number,
    showClearButton: PT.bool,
    onClearCompleted:PT.func,
    changeView:PT.func,
    view:PT.oneOf(['all','active','completed'])
}

export default class Footer extends React.Component {
    constructor(props)
    {
        super(props);

    }
    
    render() {

        let {leftCount,showClearButton,onClearCompleted,view,changeView} = this.props;

        let clearBtn = null;

        if(showClearButton){
            clearBtn = (
                <button 
                    className="clear-completed" 
                    onClick = {onClearCompleted}
                >
                    clear all completed
                </button>
            );
        }

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a 
                            href="#/all"
                            className = {view==='all'?'selected':''}
                            onClick = { ev=>changeView('all')}
                        >All</a>
                    </li>
                    <li>
                        <a 
                            href="#/active"
                            className = {view==='active'?'selected':''}
                            onClick = { ev=>changeView('active')}
                        >Active</a>
                    </li>
                    <li>
                        <a 
                            href="#/completed"
                            className = {view==='completed'?'selected':''}
                            onClick = { ev=>changeView('completed')}
                        >Completed</a>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        );
    }
}