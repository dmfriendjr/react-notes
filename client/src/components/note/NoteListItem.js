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
      (<li onClick={() => this.props.onNoteSelected(this.props.note.id)}>
        <button className={classnames('btn btn-block btn-outline-info', {active: this.props.isActive})} >
        {this.props.note.name}
        {deleteButton}
        </button>
      </li>);

    if (this.state.confirmDelete) {
      return(
        <div>
          {noteDisplay}
          <li className="list-group-item mb-3">
            <button className="col-12 btn btn-danger"
              onClick={(event) => {
                event.stopPropagation();
                this.props.onDeleteNoteClicked(this.props.note.id);
              }}>
              Confirm Delete
            </button>
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