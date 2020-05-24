import * as React from 'react';
import { remote, ipcRenderer, Dock } from 'electron';
import { IconContext } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { BsCardImage } from 'react-icons/bs';
import FlakeIdGen from 'flake-idgen';
const intformat = require('biguint-format');
import DATA from '../assets/data.json';
import PouchDB from 'pouchdb-browser';
import Mousetrap from 'mousetrap';

const generator = new FlakeIdGen();

export default class ModalForm extends React.Component<any, any> {

  fileRef: any;
  store: any;

  constructor(props: any) {
    super(props);
    this.state = {
      _id: intformat(generator.next(), 'hex'),
      _rev: '',
      title: '',
      img: '',
      serves: '',
      prepTime: { hours: 0, mins: 0, label: ''},
      cookTime: { hours: 0, mins: 0, label: ''},
      directions: [],
      dirTextVal: '',
      ingredients: [],
      ingrTextVal: '',
      category: 'DEFAULT',
      notes: '',
      update: false
    }
    this.fileRef = React.createRef();
    this.store = new PouchDB('recipes');
    this.exit = this.exit.bind(this);
    this.submit = this.submit.bind(this);
    this.parseDuration = this.parseDuration.bind(this);
    this.parseIngredient = this.parseIngredient.bind(this);
  }

  componentDidMount() {
    Mousetrap.bind('esc', this.exit, 'keyup');
    ipcRenderer.on('recipe-edit', (e: any, doc: any) => {
      let newState: object = {
        _id: doc._id,
        _rev: doc._rev,
        title: doc.title,
        serves: doc.serves,
        prepTime: doc.prepTime,
        cookTime: doc.cookTime,
        directions: doc.directions,
        dirTextVal: doc.directions.join(', '),
        ingredients: doc.ingredients,
        category: doc.category,
        notes: doc.notes,
        update: true,
        ingrTextVal: doc.ingredients.reduce((acc: any, curr: any,) => {
          acc.push(`${curr.quantity}${curr.unit} ${curr.label}`);
          return acc;
        }, []).join(', ')
      };
      this.store.getAttachment(doc._id, 'img').then((res: any) => {
        console.log(res);
        newState.img = res;
        this.setState(newState);
      }).catch(console.log);
    });
  }

  parseDuration(duration: string) {
    let mrx: RegExp = new RegExp(/([0-9][0-9]?)[ ]?m/);
    let hrx: RegExp = new RegExp(/([0-9][0-9]?)[ ]?hr/);
    let hours: number = 0;
    let mins: number = 0;

    if (mrx.test(duration)) mins = parseInt(mrx.exec(duration)[1]);
    if (hrx.test(duration)) hours = parseInt(hrx.exec(duration)[1]);
    return ({hours: hours, mins: mins, label: duration});
  }

  parseIngredient(ingredients: string) {
    let result: Array<object> = [];
    let units = DATA.units.join('|');
    let irx: RegExp = new RegExp(['^(\\d{1,4}(\\.\\d)?)[ ]?',
      `(${units})s? `,
      '(\\b[^\\d\\W]+(\\b[ |\\W][^\\d\\W]+\\b)*\\b)$'].join(''));
    ingredients.split(',').forEach((ingredient: string) => {
      let string = ingredient.trim();
      if (irx.test(string)) {
        let exec = irx.exec(string);
        result.push({ quantity: exec[1], unit: exec[3], label: exec[4]});
      }
    });
    this.setState({ ingredients: result, ingrTextVal: ingredients });
  }

  exit() {
    remote.getCurrentWindow().close();
  }

  submit() {
    let recipe: any = {
      _id: this.state._id,
      _attachments: {
        'img': {
          data: this.state.img,
          content_type: this.state.img.type
        }
      },
      title: this.state.title,
      serves: parseInt(this.state.serves),
      prepTime: this.state.prepTime,
      cookTime: this.state.cookTime,
      directions: this.state.directions,
      ingredients: this.state.ingredients,
      category: this.state.category,
      notes: this.state.notes
    }

    if (this.state.update) {
      recipe._rev = this.state._rev;
    }
    this.store.put(recipe).then(() => {
      this.setState({
        title: '',
        img: null,
        serves: '',
        prepTime: { hours: 0, mins: 0, label: ""},
        cookTime: { hours: 0, mins: 0, label: ""},
        directions: [],
        ingredients: [],
        category: 'DEFAULT',
        notes: '',
        update: false
      });
      this.fileRef.current.value = '';
      ipcRenderer.send('db-refresh-request');
      this.exit(); 
    }).catch(console.log);
  }


  render() {
    return (
      <React.Fragment>
          <div className="toolbar-actions">
            <button className="btn btn-transparent pull-left" disabled>
              <h4 className="modal-title">
                Add a Recipe
              </h4>
            </button>
            <button className="btn btn-transparent pull-right" onClick={this.exit}>
              <IconContext.Provider value={{className: 'icon-md'}}>
                <MdClear />
              </IconContext.Provider>
            </button>
          </div>
          <form className="padded-horizontally-more">

            {/* Recipe Title */}
            <div className="input-group form-group">
              <div className="input-group-prepend">Recipe</div>
              <div className="input-group-area">
                <input type="text" className="form-control"
                  value={this.state.title}
                  onChange={(e: any) => {
                    this.setState({ title: e.target.value });
                  }} />
              </div>
            </div>

            {/* Image & Serving Size */}
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend"><BsCardImage /></div>
                <div className="input-group-area">
                  <input type="file" className="form-control"
                    accept="image/*"
                    ref={this.fileRef}
                    onChange={(e: any) => {
                      this.setState({ img: e.target.files[0] })
                    }} />
                </div>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">Serves</div>
                <div className="input-group-area">
                  <input type="number" className="form-control" min={1}
                    value={this.state.serves}
                    onChange={(e: any) => this.setState({ serves: e.target.value })}
                    />
                </div>
              </div>
            </div>

            {/* Image & Serving Size */}
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend">Prep Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="e.g. 1hr 30m" className="form-control" min={1}
                    value={this.state.prepTime.label}
                    onChange={(e: any) => {
                      this.setState({ prepTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">Cook Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="e.g. 25m" className="form-control" min={1}
                    value={this.state.cookTime.label}
                    onChange={(e: any) => {
                      this.setState({ cookTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  Category
                </div>
                <div className="input-group-area">
                  <select className="form-control" value={this.state.category}
                    onChange={(e: any) => this.setState({ category: e.target.value })}>
                    <option value="DEFAULT" disabled>Select A Category</option>
                    {
                      DATA.categories.map((v: any, i: number) => {
                      return <option value={v.value} key={i}>{v.label}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>

            {/* Ingredients & Directions */}
            <div className="row text-section">
              <div className="form-group">
                <label>Ingredients</label>
                <textarea className="form-control"
                  value={this.state.ingrTextVal}
                  placeholder="Separate each ingredient with a comma"
                  onChange={(e: any) => this.parseIngredient(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Directions</label>
                <textarea className="form-control"
                  value={this.state.dirTextVal}
                  placeholder="Separate each direction with a comma"
                  onChange={(e: any) => {
                    var result = e.target.value.split(',').map((s: string) => s.trim());
                    this.setState({ directions: result, dirTextVal: e.target.value})
                  }} />
              </div>
            </div>
            
            <div className="form-group">
              <label>Notes</label>
              <textarea className="form-control" rows={1}
                value={this.state.notes}
                onChange={(e: any) => this.setState({ notes: e.target.value })} />
            </div>

            <div className="toolbar-actions pull-right"
              style={{ alignSelf: 'flex-end' }}>
              <x-button className="" onClick={this.submit}>
                Save
              </x-button>
            </div>
          </form>
        </React.Fragment>
    );
  }
}
