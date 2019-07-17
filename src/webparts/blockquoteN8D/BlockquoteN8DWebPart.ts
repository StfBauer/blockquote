import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'BlockquoteN8DWebPartStrings';
import BlockquoteN8D from './components/BlockquoteN8D';
import { IBlockquoteN8DProps } from './components/IBlockquoteN8DProps';

export interface IBlockquoteN8DWebPartProps {
  quote: string;
  author: string;
  editable: string;
}

export default class BlockquoteN8DWebPart extends BaseClientSideWebPart<IBlockquoteN8DWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IBlockquoteN8DProps > = React.createElement(
      BlockquoteN8D, {
        quote: this.properties.quote,
        author: this.properties.author,
        editable: this.displayMode === 2 ? true : false,
        // properties: this.properties,
        saveQuoteProperties: this.saveQuoteProperties,
        saveAuthorProperties: this.saveAuthorProperties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private saveQuoteProperties = (newquote: string) => {

    console.debug('Prop State Quote:::', newquote);

    this.properties.quote = newquote;

  }

  private saveAuthorProperties = (newauthor: string) => {

    console.debug('Prop State Author:::', newauthor);

    this.properties.author = newauthor;

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('quote', {
                  label: strings.FieldLabelQuote
                }),
                PropertyPaneTextField('author', {
                  label: strings.FieldLabelAuthor
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
