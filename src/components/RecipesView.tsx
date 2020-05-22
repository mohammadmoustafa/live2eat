import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import { MdAdd } from 'react-icons/md';
import { DBContext } from '../js/db-context';
import { ipcRenderer } from 'electron';
import PouchDB from 'pouchdb-browser';

const logger = require('electron-timber');
const { remote } = require('electron');
const url = require('url');

var firstLoad = false;

class RecipesView extends React.Component<any, any> {

  store: PouchDB.Database<{}>;

  constructor(props: any) {
    super(props);
    this.state = {
      recipes: []
    }
    this.store = new PouchDB('recipes');
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
  }

  loadRecipes() {
    console.log('load recipes running.')
    this.store.allDocs({
      include_docs: true,
      attachments: true,
      binary: true,
    }).then((docs: any) => {
      console.log(docs.rows);
      this.setState({ recipes: docs.rows });
    }).catch(console.log);
  }

  componentDidMount() {
    if (!firstLoad) {
      firstLoad = false;
      this.loadRecipes();
    }
    ipcRenderer.on('db-refresh', (e: any, arg: any) => {
      console.log('db-refresh');
      this.loadRecipes();
    });
  }

  // componentWillUnmount() {
  //   firstLoad = !firstLoad;
  // }

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
      height: top.getBounds().height * 0.9
    });

    win.loadURL(url.format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, '../html/modal.html')
    }));
    win.once('ready-to-show', () => {
      win.show();
    });
  }

  handleClick() {
    logger.log('Add recipe button has been clicked');
  }

  render() {
    if (this.state.recipes.length === 0) {
      return (
        <React.Fragment>
          <div className="toolbar-actions">
              <x-button skin="flat" className="btn btn-transparent"
                style={{ marginLeft: '4px', paddingTop: '2px', float: 'right'}}>
                <x-label>
                  <IconContext.Provider value={{className: 'icon-md'}}>
                    <MdAdd />
                  </IconContext.Provider>
                </x-label>
                <x-menu>
                  <x-menuitem>
                    <x-label onClick={this.showModal}>Add new recipe</x-label>
                  </x-menuitem>
                  <x-menuitem disabled>
                    <x-label>Import from URL</x-label>
                  </x-menuitem>
                </x-menu>
              </x-button>
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
              <div className="row">
              <input className="form-control" type="text" placeholder="Search for a recipe" />
              <x-button skin="flat" className="btn btn-transparent pull-right"
                style={{ marginLeft: '4px', paddingTop: '2px', float: 'right'}}>
                <x-label>
                    <IconContext.Provider value={{className: 'icon-md'}}>
                      <MdAdd />
                    </IconContext.Provider>
                </x-label>
                <x-menu>
                  <x-menuitem>
                    <x-label onClick={this.showModal}>Add new recipe</x-label>
                  </x-menuitem>
                  <x-menuitem disabled>
                    <x-label>Import from URL</x-label>
                  </x-menuitem>
                </x-menu>
              </x-button>
              </div>
            </li>
              { this.state.recipes.map((row: any) => {
                return (
                  <li className="list-group-item" key={row.doc._id}>
                    <img className="img-rounded media-object thumb pull-right"
                      src={URL.createObjectURL(row.doc._attachments.img.data)}
                      width="192" height="128" />
                    <div className="media-body">
                      <h3>{row.doc.title}</h3>
                    </div>
                    <x-contextmenu>
                      <x-menu>
                        <x-menuitem disabled>
                          <x-icon name="visibility"></x-icon>
                          <x-label>View</x-label>
                        </x-menuitem>
                        <x-menuitem disabled>
                          <x-icon name="create"></x-icon>
                          <x-label>Edit</x-label>
                        </x-menuitem>
                        <hr />
                        <x-menuitem disabled>
                          <x-icon name="delete"></x-icon>
                          <x-label>Delete '{row.doc.title}'</x-label>
                        </x-menuitem>
                      </x-menu>
                    </x-contextmenu>
                  </li>
                )
              }) }
              {/* <li className="list-group-item">
                <img className="img-circle media-object pull-left" src="" width="64" height="64" />
                <div className="media-body">
                  <strong>List item title</strong>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </li> */}
          </ul>
        </React.Fragment>
      );
    }
  }
}
RecipesView.contextType = DBContext;
export default RecipesView;
