import * as React from 'react';
import { remote } from 'electron';
import { IconContext } from 'react-icons';
import { MdClear, MdKitchen } from 'react-icons/md';
import { BsCardImage } from 'react-icons/bs';
import { IoIosFlame } from 'react-icons/io';

const logger = require('electron-timber');

export default class ModalForm extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      prepTime: [0, 0, ''],
      cookTime: [0, 0, ''],
    }
    this.exit = this.exit.bind(this);
    this.parseDuration = this.parseDuration.bind(this);
  }

  exit() {
    remote.getCurrentWindow().close();
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


  render() {
    return (
      <React.Fragment>
          <div className="toolbar-actions" onClick={this.exit}>
            <button className="btn btn-transparent pull-left" disabled>
              <h4 className="modal-title">
                Add a Recipe
              </h4>
            </button>
            <button className="btn btn-transparent pull-right">
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
                <input type="text" className="form-control" />
              </div>
            </div>

            {/* Image & Serving Size */}
            <div className="row">
              <div className="input-group form-group">
                <div className="input-group-prepend"><BsCardImage /></div>
                <div className="input-group-area">
                  <input type="file" className="form-control" />
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
                <div className="input-group-prepend"><MdKitchen /> Prep Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="1hr 30m" className="form-control" min={1}
                    value={this.state.prepTime[-1]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ prepTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend"><IoIosFlame /> Cook Time</div>
                <div className="input-group-area">
                  <input type="text" placeholder="25m" className="form-control" min={1}
                    value={this.state.cookTime[-1]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      this.setState({ cookTime: this.parseDuration(e.target.value) });
                    }}/>
                </div>
              </div>
            </div>
          </form>
        </React.Fragment>
    );
  }
}