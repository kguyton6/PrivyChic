import React from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const ModalBox = styled.div`
  width: 350px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  position: relative;

  input {
    box-shadow: 0 .5px 0 .5px rgb(199, 199, 199);
    width: 80%;
    height: 45px;
    margin: 10px;
  }
  button {
    height: 60px;
  }
  form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const Background = styled.div`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.671);
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const modalRoot = document.getElementById('modal-root');
const appRoot = document.getElementById('app-root');

class Modal extends React.Component {
    constructor(props){
        super(props)
        this.el = document.createElement('div');
    }
    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        modalRoot.appendChild(this.el);
      }
    
      componentWillUnmount() {
        modalRoot.removeChild(this.el);
      }
    
      render() {
        return ReactDOM.createPortal(

        <Background id='modal-root'>
        <ModalBox>
        {this.props.children}
            </ModalBox>
            </Background>,
          this.el,
        );
      }
    }
export default Modal