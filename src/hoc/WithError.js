import React from 'react'
import Modal from '../components/UI/Modal/Modal'

const WithError = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor= axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.resInterceptor= axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor)
        }

        render() {
            return (
                <React.Fragment>
                    <Modal show={this.state.error} cancelModal={()=>{ this.setState({error:null})}}>{this.state.error?this.state.error.message:null}</Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }

    }
}
export default WithError