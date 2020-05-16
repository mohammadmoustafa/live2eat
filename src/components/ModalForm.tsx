import * as React from 'react';
import { remote } from 'electron';
import { IconContext } from 'react-icons';
import { MdClear } from 'react-icons/md';
import { BsCardImage } from 'react-icons/bs';

const logger = require('electron-timber');

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
      ingredients: [],
      tags: [],
    }
    this.fileRef = React.createRef();
    this.exit = this.exit.bind(this);
    this.submit = this.submit.bind(this);
    this.parseDuration = this.parseDuration.bind(this);
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

  exit() {
    remote.getCurrentWindow().close();
  }

  submit() {
    console.log('clear it');
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
                  <input type="number" className="form-control" min={1}/>
                </div>
              </div>
            </div>

            {/* Image & Serving Size */}
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend">Prep Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="1hr 30m" className="form-control" min={1}
                    value={this.state.prepTime[-1]}
                    onChange={(e: any) => {
                      this.setState({ prepTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">Cook Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="25m" className="form-control" min={1}
                    value={this.state.cookTime[-1]}
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
                <textarea className="form-control"
                  placeholder="Separate each ingredient with a comma" />
              </div>
              <div className="form-group">
                <label>Directions</label>
                <textarea className="form-control"
                  placeholder="Separate each direction with a comma" />
              </div>
            </div>
            <x-taginput></x-taginput>
              <div className="toolbar-actions pull-right"
                style={{ alignSelf: 'flex-end'}}>
                <x-button className="" onClick={this.submit}>
                  Save
                </x-button>
              </div>
          </form>
        </React.Fragment>
    );
  }
}
