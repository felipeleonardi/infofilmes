import React, { Component } from 'react';
import { List, Segment, Grid, Image } from 'semantic-ui-react';
import ListItemComponent from './ListItemComponent';

export default class ListComponent extends Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const list = document.getElementById('cast-modal-list');
        const { offsetHeight, scrollHeight, scrollTop } = list;
        console.log(scrollHeight, scrollTop + offsetHeight);
        if (scrollHeight <= scrollTop + offsetHeight) {
            this.setCastPage();
        }
    }

    mountCastItems(cast) {
        let castItems = cast.map((item, index) =>  
            (
                <ListItemComponent 
                    index={ index }
                    item={ item }
                />
            )
        )
        return castItems;
    }

    render() {
        const cast = this.mountCastItems(this.props.cast);
        return (
            <Segment className='bgBlack pl0 pr0'>
                <List
                    divided
                    relaxed
                    size={ 'medium' }
                    className="itemCast list-modal"
                    id="cast-modal-list"
                    onScroll={ this.handleScroll }
                >
                    { cast }
                </List>
            </Segment>
        );
    }
}