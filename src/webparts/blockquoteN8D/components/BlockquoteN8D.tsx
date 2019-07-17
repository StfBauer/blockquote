import * as React from 'react';
import styles from './BlockquoteN8D.module.scss';
import { IBlockquoteN8DProps } from './IBlockquoteN8DProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface IBlockquoteN8DState {
  quote: string;
  author: string;
}

export default class BlockquoteN8D extends React.Component<IBlockquoteN8DProps, IBlockquoteN8DState> {

  constructor(props) {

    super(props);

    console.debug('PROPS', props);

    this.state = {
      quote: props.quote,
      author: props.author
    };

    this.setState(this.state);

  }

  public changeBlockquote = event => {

    event.preventDefault();

    console.debug('Inner Text', event.target.innerText);
    console.debug('Inner Text', event.target.innerHTML);
    console.debug('Text Content', event.target.textContent);
    console.debug('event.fired');

    this.setState({
      quote: event.target.innerText,
      author: this.state.author
    });

    this.props.saveQuoteProperties(event.target.innerHTML);

  }

  public changeBlockquoteAuthor = event => {

    event.preventDefault();

    let newAuthor = event.target.innerText.replace(/\n/g, '');

    console.debug('New Author:', newAuthor);

    this.setState({
      quote: this.state.quote,
      author: newAuthor
    });

    this.props.saveAuthorProperties(event.target.innerText);

  }


  public render(): React.ReactElement<IBlockquoteN8DProps> {


    console.debug('current state', this.state);


    if(this.props.editable){
      console.debug('Editable');
    } else {
      console.debug('Preview');
    }

    return (
      <blockquote className={styles.myQuote}>
        <span contentEditable={this.props.editable} onInput={this.changeBlockquote.bind(this)} placeholder="Quote" dangerouslySetInnerHTML={{ __html: this.props.quote }} >
        </span>
        <footer className={styles.myQuoteFooter} contentEditable={this.props.editable} placeholder="Author" onInput={this.changeBlockquoteAuthor.bind(this)} >{this.props.author}</footer>
      </blockquote>
    );
  }
}
