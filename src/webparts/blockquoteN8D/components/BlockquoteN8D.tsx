import * as React from 'react';
import styles from './BlockquoteN8D.module.scss';
import { IBlockquoteN8DProps } from './IBlockquoteN8DProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class BlockquoteN8D extends React.Component<IBlockquoteN8DProps, {}> {
  public render(): React.ReactElement<IBlockquoteN8DProps> {
    return (
      <blockquote className={styles.myQuote}>
        The important thing is not to  stop questioning.<br />
        Curiosity has its own reason for existing.
        <footer className={styles.myQuoteFooter}>Albert Einstein</footer>
      </blockquote>
    );
  }
}
