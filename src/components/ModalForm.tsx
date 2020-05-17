import * as React from 'react';
import { remote } from 'electron';
import { IconContext } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { BsCardImage } from 'react-icons/bs';
import DATA from '../assets/data.json';

export default class ModalForm extends React.Component<any, any> {

  fileRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      img: '',
      prepTime: [0, 0, ''],
      cookTime: [0, 0, ''],
      directions: [],
      dirTextVal: '',
      ingredients: [],
      ingrTextVal: '',
      category: 'Select A Category'
    }
    this.fileRef = React.createRef();
    this.exit = this.exit.bind(this);
    this.submit = this.submit.bind(this);
    this.parseDuration = this.parseDuration.bind(this);
    this.parseIngredient = this.parseIngredient.bind(this);
  }

  parseDuration(duration: string) {
    if (duration == null || duration === '') return 0;
    let mrx: RegExp = new RegExp(/([0-9][0-9]?)[ ]?m/);
    let hrx: RegExp = new RegExp(/([0-9][0-9]?)[ ]?hr/);
    let hours: number = 0;
    let mins: number = 0;

    if (mrx.test(duration)) mins = parseInt(mrx.exec(duration)[1]);
    if (hrx.test(duration)) hours = parseInt(hrx.exec(duration)[1]);
    return ([hours, mins, duration]);
  }

  parseIngredient(ingredients: string) {
    if (ingredients == null || ingredients === '') return '';
    let result: Array<string[]> = [];
    let units = DATA.units.join('|');
    let irx: RegExp = new RegExp(['^(\\b\\d{1,4}(\\b\\.\\d\\b)?)[ ]*',
      `(\\b${units})s? `,
      '(\\b[^\\d\\W]+\\b)$'].join(''));
    ingredients.split(',').forEach((ingredient: string) => {
      let string = ingredient.trim();
      if (irx.test(string)) {
        let exec = irx.exec(string);
        result.push([exec[1], exec[3], exec[4]]);
      }
    });
    this.setState({ ingredients: result, ingrTextVal: ingredients });
  }

  exit() {
    remote.getCurrentWindow().close();
  }

  submit() {
    let recipe: any = {
      title: this.state.title,
      img: this.state.img,
      prepTime: this.state.prepTime,
      cookTime: this.state.cookTime,
      directions: this.state.directions,
      ingredients: this.state.ingredients,
      category: this.state.category,
    }
    console.log(recipe);
    this.fileRef.current.value = '';
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
                <input type="text" className="form-control" required
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
                  <input type="number" className="form-control" min={1} required/>
                </div>
              </div>
            </div>

            {/* Image & Serving Size */}
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend">Prep Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="e.g. 1hr 30m" className="form-control" min={1}
                    value={this.state.prepTime[-1]}
                    required
                    onChange={(e: any) => {
                      this.setState({ prepTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">Cook Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="e.g. 25m" className="form-control" min={1}
                    value={this.state.cookTime[-1]}
                    required
                    onChange={(e: any) => {
                      this.setState({ cookTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
            </div>

            {/* Ingredients & Directions */}
            <div className="row text-section">
              <div className="form-group">
                <label>Ingredients</label>
                <textarea className="form-control" required
                  value={this.state.ingrTextVal}
                  placeholder="Separate each ingredient with a comma"
                  onChange={(e: any) => this.parseIngredient(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Directions</label>
                <textarea className="form-control" required
                  value={this.state.dirTextVal}
                  placeholder="Separate each direction with a comma"
                  onChange={(e: any) => {
                    var result = e.target.value.split(',').map((s: string) => s.trim());
                    this.setState({ directions: result, dirTextVal: e.target.value})
                  }} />
              </div>
            </div>
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  Category
                </div>
                <div className="input-group-area">
                  <select className="form-control" defaultValue="DEFAULT" required
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
