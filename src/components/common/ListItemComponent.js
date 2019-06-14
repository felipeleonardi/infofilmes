import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

export default class ListItemComponent extends Component {

    constructor(props) {
        super(props);
        this.handleLoadImage = this.handleLoadImage.bind(this);
    }

    handleLoadImage(e) {
        $(e.target).css('visibility', 'visible').hide().fadeIn(1500);
    }

    render() {
        return (
            <List.Item key={ `cast-${this.props.index}` } >
                <Image 
                    src={ this.props.item.poster } 
                    className="image-list"
                    style={{visibility: 'hidden'}}
                    onLoad={ this.handleLoadImage }
                />
                <List.Content>
                    <List.Header className='text-custom-green fs16 mb5'>
                        { this.props.item.name }
                    </List.Header>
                    <span className='text-white'>
                        { this.props.item.description }
                    </span>
                </List.Content>
            </List.Item>
        );
    }
}