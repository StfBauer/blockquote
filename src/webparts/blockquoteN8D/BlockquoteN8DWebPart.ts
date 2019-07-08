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
  description: string;
}

export default class BlockquoteN8DWebPart extends BaseClientSideWebPart<IBlockquoteN8DWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBlockquoteN8DProps > = React.createElement(
      BlockquoteN8D,
      {
        description: this.properties.description
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
