// eslint-disable-line
/* eslint-disable no-alert */
import React, { Component } from 'react';
import {
    Button, Modal, Form
} from 'react-bootstrap';


import './styles/EditNodeModal.css';

class DeleteNodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    handleClose() {
        this.setState({ // make it default again
            isOpen: false,
        });
        this.toggleModal();
    }

    handleSubmit() {
        this.toggleModal();
        this.props.delNode(this.props.node)
    }

    render() {
        const { node } = this.props;
        const {
            isOpen,
        } = this.state;
        if (!node) return <span />;
        return (
            <div>
                <Button className="btn btn-info btn-lg btn-mod" onClick={this.toggleModal}>Delete node</Button>
                <Modal className="Modal" show={isOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Node</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button style={{ backgroundColor: '#a9a8a8' }} variant="primary" type="submit" onClick={this.handleSubmit}>
                            Confirm Delete
            </Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

export default DeleteNodeModal;