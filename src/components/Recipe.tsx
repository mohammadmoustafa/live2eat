import React from 'react';
import { IconContext } from 'react-icons';
import { MdAdd } from 'react-icons/md';
import { ipcRenderer } from 'electron';
import PouchDB from 'pouchdb-browser';

export default class Recipe extends React.Component<any, any> {

  _id: any;
  db: any;

  constructor(props: any) {
    super(props);
    this.db = new PouchDB('recipes');
    this._id = this.props.match.params.id;
    this.state = {
      recipe: null
    }
  }

  componentDidMount() {
    // add a throbber to display while the recipe gets loaded from the database
    this.db.get(this._id, {
      attachments: true,
      binary: true
    }).then((doc: any) => {
      this.setState({ recipe: doc })
    }).catch(console.log);
  }

  render() {
    if (this.state.recipe) {
      return (
        <div className="hero-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${URL.createObjectURL(this.state.recipe._attachments.img.data)})`
          }}>
          <div className="hero-text">
            <h1>{this.state.recipe.title}</h1>
          </div>
        </div>
      )
    }
    return (
      <x-throbber class="center-noflex" type="spin"></x-throbber>
    )
  }
}
