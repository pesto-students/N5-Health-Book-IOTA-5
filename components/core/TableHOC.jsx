import React, {Component} from 'react';
import { isAuth} from '../../actions/auth';

export default function TableHoc(HocComponent, data){
   
    return class extends Component{
        constructor(props) {
            super(props);            
           
            this.state = {
                data: null
            };
        }

        componentDidMount(){           
            let auth = isAuth();
            let value = data(auth.uid);
            this.setState({data:value});
        }
        
        render(){
            return (
                <>
                {this.state.data && <HocComponent data={this.state.data} {...this.props} />}
                </>
                
            );
        }
    } 
}