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

    // this.setState(this.state);

  }

  public changeBlockquote = event => {

    event.preventDefault();

    console.clear();

    console.debug('Inner Text:::\n', event.target.innerText);
    console.debug('Inner Text:::::\n', event.target.innerHTML);
    console.debug('Text Content', event.target.textContent);

    console.debug('----- -- - -- ', event.target.innerText.indexOf('\n'));

    let cleanedHTML = event.target.innerText;
    cleanedHTML = cleanedHTML.replace(/\n/g, '<br>');

    console.debug('CLEANED HTML', cleanedHTML);

    this.setState({
      quote: event.target.innerText,
      author: this.state.author
    });

    this.props.saveQuoteProperties(cleanedHTML);

  }

  public changeBlockquoteAuthor = event => {

    console.clear();
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


    if (this.props.editable) {
      console.debug('Editable');
    } else {
      console.debug('Preview');
    }

    return (
      <blockquote className={styles.myQuote}>
        <div contentEditable={this.props.editable} suppressContentEditableWarning={true} onInput={this.changeBlockquote.bind(this)} placeholder="Quote" dangerouslySetInnerHTML={{ __html: this.props.quote }} >
        </div>
        <footer className={styles.myQuoteFooter} contentEditable={this.props.editable} placeholder="Author" onInput={this.changeBlockquoteAuthor.bind(this)} >{this.props.author}</footer>
      </blockquote>
    );
  }
}
