import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

import './styles/AddNodeModal.css'

export default class AddNodeModal extends Component {
	constructor(props) {
		super(props);
    this.state = { 
      isOpen: false,
      nodeType: 0,
      topicName: '',
      resourceType: 0
    }
    this.addNode = this.props.addNode
    this.toggleModal = this.toggleModal.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	toggleModal = event => {
		const { isOpen } = this.state;
		this.setState({ isOpen: !isOpen });
  }
  
  handleClose() {
    this.setState({ // make it default again
      isOpen: false,
      nodeType: 0,
      topicName: '',
      resourceType: 0,
      resourceData: null
    })
    this.toggleModal()
  }

  handleSubmit() {
    var nodeType = this.state.nodeType

    // get the topic name, or don't have the key
    if (nodeType === 0) {
      alert("Must have node type!")
      return
    } else if (nodeType === 1) {
      if (this.state.topicName.length === 0) {
        alert("Invalid topic name!")
        return
      }
      var data = { name: this.state.topicName }
    } else { // nodeType === 2 aka Resource
      if (this.state.resourceType === 0) {
        alert("Invalid resource type!")
        return
      }
      var data = {
        resource_type: this.state.resourceType,
        data: this.state.resourceData
      }
    }

    data.node_type = nodeType // everyone has a nodeType

    this.addNode(data)
    this.toggleModal()
  }

  render() {
    return (
      <div>
        <Button className="btn btn-primary" onClick={this.toggleModal}>Add node</Button>
        <Modal show={this.state.isOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Node</Modal.Title>
          </Modal.Header>

            <Modal.Body>
              <Form.Label>Node type</Form.Label>
              <Form.Group>
                <Form.Check type="radio" name="radioNodeType" label="Topic" onClick={() => this.setState({nodeType: 1})} />
                <Form.Check type="radio" name="radioNodeType" label="Resource" onClick={() => this.setState({nodeType: 2})} />
              </Form.Group>

              {/* so lazy */}
              {
              this.state.nodeType === 0 ? <p>Pick a node type please</p> : (
                this.state.nodeType === 1 ? 
                  <Form.Group>
                    <Form.Label>Topic Name</Form.Label>
                    <Form.Control type="text" placeholder="Bitcoin" onChange={ev => this.setState({topicName: ev.target.value})}/>
                  </Form.Group>
                : 
                  <Form.Group>
                    <Form.Label>Resource data</Form.Label>
                    <Form.Group>
                      <Form.Check type="radio" name="radioResourceType" label="Description" onClick={() => this.setState({resourceType: 1, resourceData: ''})} />
                      <Form.Check type="radio" name="radioResourceType" label="Article" onClick={() => this.setState({resourceType: 2, resourceData: {}})} />
                      <Form.Check type="radio" name="radioResourceType" label="Video" onClick={() => this.setState({resourceType: 3, resourceData: {}})} />
                      <Form.Check type="radio" name="radioResourceType" label="Paper" onClick={() => this.setState({resourceType: 4, resourceData: {}})} />
                    </Form.Group>
                    
                    {
                      this.state.resourceType === 0 || this.state.resourceType === 1 ?
                        <div>
                          <Form.Control id="abc" name="abc" type="text" placeholder="Bitcoin is a p2p cash system" onChange={ev => this.setState({resourceData: ev.target.value})}/>
                          <Form.Control.Feedback type="invalid">
                            Please provide valid resource data
                          </Form.Control.Feedback>
                          <Form.Text>
                            Resource data can be a description or hyperlink
                          </Form.Text>
                        </div>
                      :
                        <div>
                          <Form.Control 
                            type="text" 
                            placeholder="Bitcoin whitepaper" 
                            onChange={ev => {
                              var val = ev.target.value // to save the virtual event
                              this.setState(prevState => ({
                                resourceData: { 
                                  ...prevState.resourceData, 
                                  text: val
                                }
                              })) 
                            }}/>
                          <Form.Control.Feedback type="invalid">
                            Please provide valid resource link name
                          </Form.Control.Feedback>
                          <Form.Text>
                            Resource link name
                          </Form.Text>

                          <Form.Control 
                            type="url" 
                            placeholder="https://bitcoin.org/bitcoin.pdf" 
                            onChange={ev => {
                              var val = ev.target.value
                              this.setState(prevState => ({
                                resourceData: { 
                                  ...prevState.resourceData, 
                                  link: val
                                }
                              })) 
                            }}/>                          
                          <Form.Control.Feedback type="invalid">
                            Please provide valid resource link
                          </Form.Control.Feedback>
                          <Form.Text>
                            Resource link URL
                          </Form.Text>
                        </div>
                    }


                  </Form.Group>
                
                )
              }

            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                Add node
              </Button>
            </Modal.Footer>

        </Modal>
      </div>
    );
  }
}