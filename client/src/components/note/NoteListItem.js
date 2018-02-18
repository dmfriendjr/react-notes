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
    this.setState({confirmDelete: true});

    this.onDeleteTimeout = setTimeout(() => {
        this.setState({confirmDelete: false});
    }, 3000);
  }

  render() {
    let deleteButton;

    if (this.state.confirmDelete) {
      deleteButton = 
      (<button type="button" onClick={(event) => {event.stopPropagation(); this.props.onDeleteNoteClicked(this.props.note.id);}} className="btn btn-danger ml-3" aria-label="Close">
        <span aria-hidden="true">Confirm</span>
      </button>);
    } else {
      deleteButton =  (<button type="button" onClick={(event) => 
        {
          event.stopPropagation();
          this.onDeleteClicked();
        }} 
      className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>);
    }

    return (
      <li className=
        {classnames('list-group-item', {active: this.props.isActive})} 
        key={this.props.note.id} 
        onClick={() => this.props.onNoteSelected(this.props.note.id)}>{this.props.note.name}
        {deleteButton} 
      </li>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  onDeleteNoteClicked: PropTypes.func.isRequired,
  onNoteSelected: PropTypes.func.isRequired
};


export default NoteListItem;