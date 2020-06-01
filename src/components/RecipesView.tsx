import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReceipt, faPlus} from '@fortawesome/free-solid-svg-icons';
import {IconContext} from 'react-icons';
import {MdAdd} from 'react-icons/md';
import {DBContext} from '../js/db-context';
import {ipcRenderer} from 'electron';
import PouchDB from 'pouchdb-browser';
import {Link, Redirect} from 'react-router-dom';

const {remote} = require('electron');
const url = require('url');
const Dialogs = require('dialogs');
const dialogs = Dialogs();

let firstLoad = false;

class RecipesView extends React.Component<any, any> {
  store: PouchDB.Database<{}>;

  constructor(props: any) {
    super(props);
    this.state = {
      recipes: [],
      display: [],
      query: '',
    };
    this.store = new PouchDB('recipes');
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    this.edit = this.edit.bind(this);
  }

  loadRecipes() {
    this.store.allDocs({
      include_docs: true,
      attachments: true,
      binary: true,
    }).then((docs: any) => {
      this.setState({recipes: docs.rows, display: docs.rows});
    }).catch(console.log);
  }

  componentDidMount() {
    if (!firstLoad) {
      firstLoad = false;
      this.loadRecipes();
    }
    ipcRenderer.on('db-refresh', () => {
      this.loadRecipes();
    });
  }

  componentWillUnmount() {
    firstLoad = false;
  }

  search(query: string) {
    this.setState({
      query: query,
      display: this.state.recipes.filter((row: any) => {
        return row.doc.title.toLowerCase().includes(query.toLowerCase());
      }),
    });
  }

  edit(doc: any) {
    this.showModal(doc);
  }

  showModal(arg?: any) {
    const top = remote.getCurrentWindow();
    const win = new remote.BrowserWindow({
      parent: top,
      modal: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
      },
      width: top.getBounds().width * 0.75,
      height: top.getBounds().height * 0.9,
    });

    win.loadURL(url.format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, '../html/modal.html'),
    }));
    win.once('ready-to-show', () => {
      win.show();
      if (arg) win.webContents.send('recipe-edit', arg);
    });
  }

  delete(id: string, rev: string) {
    dialogs.confirm('Are you sure you want to delete this recipe?', (res: any) => {
      if (res) this.store.remove(id, rev).then(this.loadRecipes).catch(console.log);
    });
  }

  handleClick(doc: any) {
    this.props.history.push({
      pathname: `/view_recipe/${doc._id}`,
    });
  }

  render() {
    if (this.state.recipes.length === 0) {
      return (
        <React.Fragment>
          <div className="toolbar-actions">
            <x-button skin="flat" className="btn btn-transparent"
              style={{marginLeft: '4px', paddingTop: '2px', float: 'right'}}>
              <x-label>
                <IconContext.Provider value={{className: 'icon-md'}}>
                  <MdAdd />
                </IconContext.Provider>
              </x-label>
              <x-menu>
                <x-menuitem>
                  <x-label onClick={() => this.showModal()}>Add new recipe</x-label>
                </x-menuitem>
                <x-menuitem disabled>
                  <x-label>Import from URL</x-label>
                </x-menuitem>
              </x-menu>
            </x-button>
          </div>
          <header className="body">
            <FontAwesomeIcon icon={faReceipt} className="icon-xl" style={{marginBottom: '15px'}} />
            <h3 className="body">Hmm...doesn&apos;t look like there&apos;s anything here.</h3>
          </header>
        </React.Fragment>
      );
    } else {
      const formattedRecipes = this.state.display.map((row: any, i: number) => {
        return (
          <li className="list-group-item" key={row.doc._id}
            onDoubleClick={() => this.handleClick(row.doc)} >
            <img className="img-rounded media-object thumb pull-right"
              src={URL.createObjectURL(row.doc._attachments.img.data)}
              width="192" height="128" />
            <div className="media-body">
              <h3>{row.doc.title}</h3>
              <h5>Prep Time: {row.doc.prepTime.label}</h5>
              <h5>Cook Time: {row.doc.cookTime.label}</h5>
            </div>
            <x-contextmenu>
              <x-menu>
                <x-menuitem onClick={() => this.handleClick(row.doc)}>
                  <x-icon name="visibility"></x-icon>
                  <x-label>View</x-label>
                </x-menuitem>
                <x-menuitem onClick={() => this.edit(row.doc)}>
                  <x-icon name="create"></x-icon>
                  <x-label>Edit</x-label>
                </x-menuitem>
                <hr />
                <x-menuitem onClick={() => this.delete(row.doc._id, row.doc._rev)}>
                  <x-icon name="delete"></x-icon>
                  <x-label>Delete '{row.doc.title}'</x-label>
                </x-menuitem>
              </x-menu>
            </x-contextmenu>
          </li>
        );
      });
      return (
        <React.Fragment>
          <ul className="list-group" id="recipes-group">
            <li className="list-group-header">
              <div className="row">
                <input className="form-control" type="text" placeholder="Search for a recipe"
                  onChange={(e: any) => this.search(e.target.value)}/>
                <x-button skin="flat" className="btn btn-transparent pull-right"
                  style={{marginLeft: '4px', paddingTop: '2px', float: 'right'}}>
                  <x-label>
                    <IconContext.Provider value={{className: 'icon-md'}}>
                      <MdAdd />
                    </IconContext.Provider>
                  </x-label>
                  <x-menu>
                    <x-menuitem>
                      <x-label onClick={() => this.showModal()}>Add new recipe</x-label>
                    </x-menuitem>
                    <x-menuitem disabled>
                      <x-label>Import from URL</x-label>
                    </x-menuitem>
                  </x-menu>
                </x-button>
              </div>
            </li>

            { formattedRecipes }

            <li className="list-group-item"
              style={{
                fontWeight: 200,
                opacity: 0.7,
                textAlign: 'center',
              }}>
              End of recipes.
            </li>


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
