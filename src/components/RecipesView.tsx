import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import { MdAdd } from 'react-icons/md';

const logger = require('electron-timber');
const { remote } = require('electron');
const url = require('url');

export default class RecipesView extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      recipes: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    let top = remote.getCurrentWindow();
    let win = new remote.BrowserWindow({
      parent: top,
      modal: true,
      show: false,
      webPreferences: {
        nodeIntegration: true
      },
      width: top.getBounds().width * 0.75,
      height: top.getBounds().height * 0.75
    });
    logger.log("Modal navigating to html/modal.html");
    win.loadURL(url.format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, '../html/modal.html')
    }));
    win.once('ready-to-show', () => {
      win.show();
    })
  }

  handleClick() {
    logger.log('Add recipe button has been clicked');
  }

  render() {
    if (this.state.recipes.length === 0) {
      return (
        <React.Fragment>
          <div className="toolbar-actions" onClick={this.showModal}>
            <button className="btn btn-transparent pull-right">
              <IconContext.Provider value={{className: 'icon-md'}}>
                <MdAdd />
              </IconContext.Provider>
            </button>
          </div>
          <header className="body">
            <FontAwesomeIcon icon={faReceipt} className="icon-xl" style={{marginBottom: "15px"}} />
            <h3 className="body">Hmm...doesn't look like there's anything here.</h3>
          </header>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ul className="list-group">
            <li className="list-group-header">
              <input className="form-control" type="text" placeholder="Search for someone" />
            </li>
            {/* <li className="list-group-item">
              <img className="img-circle media-object pull-left" src="" width="64" height="64" />
              <div className="media-body">
                <strong>List item title</strong>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </li> */}
            <li className="list-group-item">
              <img className="img-circle media-object pull-left" src="https://via.placeholder.com/150" width="32" height="32" />
              <div className="media-body">
                <strong>List item title</strong>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}