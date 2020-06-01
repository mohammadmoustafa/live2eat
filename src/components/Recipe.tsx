import React from 'react';
import {IconContext} from 'react-icons';
import {MdAdd} from 'react-icons/md';
import {ipcRenderer} from 'electron';
import PouchDB from 'pouchdb-browser';
import ReactMarkdown from 'react-markdown';

export default class Recipe extends React.Component<any, any> {
  _id: any;
  db: any;

  constructor(props: any) {
    super(props);
    this.db = new PouchDB('recipes');
    this._id = this.props.match.params.id;
    this.state = {
      recipe: null,
    };
    this.timeLabel = this.timeLabel.bind(this);
  }

  componentDidMount() {
    this.db.get(this._id, {
      attachments: true,
      binary: true,
    }).then((doc: any) => {
      this.setState({recipe: doc});
    }).catch(console.log);
  }

  timeLabel(time: any) {
    const hrs = (time.hours > 0) ? `${time.hours} hrs` : '';
    const mins = (time.mins > 0) ? ((time.mins > 1) ? `${time.mins} mins`: `${time.mins} min`) : '';
    return ([hrs, mins].join(' '));
  }

  render() {
    if (this.state.recipe) {
      return (
        <React.Fragment>
          <div className="hero-image"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${URL.createObjectURL(this.state.recipe._attachments.img.data)})`,
            }}>
            <div className="hero-text">
              <h1>{this.state.recipe.title}</h1>
            </div>
          </div>
          <div className="col" style={{height: '55%'}}>
            <div className="row" id="recipe-meta">
              <span>Prep Time: {this.timeLabel(this.state.recipe.prepTime)}</span>
              <span>Cook Time: {this.timeLabel(this.state.recipe.cookTime)}</span>
              <span>Serves: {this.state.recipe.serves}</span>
              <span>Category: {this.state.recipe.category}</span>
            </div>
            <div className="row">
              <div className="col" id="recipe-ingredients">
                <ul className="ul-no-style">
                  Ingredients
                  {
                    this.state.recipe.ingredients.map((item: any, i: number) => {
                      return ( <li key={i}>{item.quantity} {item.unit} {item.label}</li> );
                    })
                  }
                </ul>
              </div>
              <div className="col" id="recipe-directions" style={{
                flexGrow: 2,
              }}>
                <ol className="ul-no-style">
                  Directions
                  {
                    this.state.recipe.directions.map((item: any, i: number) => {
                      return ( <li key={i}>{item}</li> );
                    })
                  }
                </ol>
              </div>
            </div>
            { this.state.recipe.notes &&
              <div className="col" id="recipe-notes">
                <h4>Notes</h4>
                <ReactMarkdown source={this.state.recipe.notes} />
              </div>
            }
          </div>
        </React.Fragment>
      );
    }
    return (
      <x-throbber class="center-noflex" type="spin"></x-throbber>
    );
  }
}
