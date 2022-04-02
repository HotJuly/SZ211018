import React,{Component} from 'react';
class App extends Component{
  state={
    msg:0
  }

  ref666 = React.createRef();

  handleClick=()=>{
    this.setState({
      msg:this.state.msg+1
    })
    console.log('1',this.state.msg)
    debugger

    this.setState({
      msg:this.state.msg+1
    })
    console.log('2',this.state.msg)

    this.setState({
      msg:this.state.msg+1
    })
    console.log('3',this.state.msg)
  }

  render(){
    return (
      <div>
        <h1>{this.state.msg}</h1>
        {/* <button  onClick={this.handleClick}>+1</button> */}
        <button ref={this.ref666}>+1</button>
      </div>
    )
  }
  componentDidMount(){
    this.ref666.current.onclick=this.handleClick;
  }
}
export default App;
