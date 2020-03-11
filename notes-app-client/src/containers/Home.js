import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  notes() {
    return API.get("notes", "/notes");
  }  

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
              key={note.noteId}
              to={`/notes/${note.noteId}`}
            >
              <ListGroupItem header={note.content.trim().split("\n")[0]}>
                {"Created: " + new Date(note.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/notes/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new note
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}

/*We are doing a few things of note here:

    Rendering the lander or the list of notes based on this.props.isAuthenticated.

    Store our notes in the state. Currently, it’s empty but we’ll be calling our API for it.

    Once we fetch our list we’ll use the renderNotesList method to render the items in the list.

And that’s our basic setup! Head over to the browser and the homepage of our app should render out an empty list.*/