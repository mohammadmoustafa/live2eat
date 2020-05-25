import React from 'react';
import { IconContext } from 'react-icons';
import { MdAdd } from 'react-icons/md';
import { ipcRenderer } from 'electron';
import PouchDB from 'pouchdb-browser';

export default class Recipe extends React.Component<any, any> {

  recipe: any;

  constructor(props: any) {
    super(props);
    this.recipe = this.props.location.state.recipe;
  }

  componentDidMount() {
    console.log(this.recipe);
  }

  render() {
    return (
      <header className="body">
        <h1 className="body">View Recipe</h1>
          <h2 className="body">Currently viewing recipe '{this.recipe.title}'</h2>
      </header>
    )
  }
}