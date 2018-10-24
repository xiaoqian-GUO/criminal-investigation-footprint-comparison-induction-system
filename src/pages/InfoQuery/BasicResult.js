import React from 'react';
import './BasicResult.less';
class BasicResult extends React.Component{
  componentDidMount(){
    console.log(localStorage);
  }
  render(){
    return (
      <div>
        <h3>BasicResult</h3>
      </div>
    ); 
  }
}
export default BasicResult;
