import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class NoteListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({confirmDelete: false});
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.onDeleteTimeout;
  }

  componentWillUnmount() {
    if (this.onDeleteTimeout) {
      clearInterval(this.onDeleteTimeout);
    }
  }

  onDeleteClicked() {
    if (this.state.confirmDelete) {
      return;
    }

    this.setState({confirmDelete: true});

    this.onDeleteTimeout = setTimeout(() => {
        this.setState({confirmDelete: false});
    }, 3000);
  }

  render() {
    let deleteButton = 
      (<button type="button" 
          onClick={(event) => 
            {
              event.stopPropagation();
              event.target.parentNode.blur();
              this.onDeleteClicked();
            }} 
          className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>);
    let noteDisplay =
      (<li className=
          {classnames('list-group-item', {active: this.props.isActive})} 
          onClick={() => this.props.onNoteSelected(this.props.note.id)}>
        {this.props.note.name}
        {deleteButton}
      </li>);

    if (this.state.confirmDelete) {
      return(
        <div>
          {noteDisplay}
          <li className="list-group-item bg-danger text-white mb-3"
            onClick={(event) => {
              event.stopPropagation();
              this.props.onDeleteNoteClicked(this.props.note.id);
            }}>
          Confirm Delete
          </li>
        </div>
      );
    } else {
      return (
        <div>
          {noteDisplay}
        </div>
      );
    }
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  onDeleteNoteClicked: PropTypes.func.isRequired,
  onNoteSelected: PropTypes.func.isRequired
};


export default NoteListItem;