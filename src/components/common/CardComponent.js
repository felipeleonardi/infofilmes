import React, { Component } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/common/actions';
import $ from 'jquery';
import { slugify } from 'underscore.string';

class CardComponent extends Component {

    constructor(props) {
        super(props);
        this.mountCardsList = this.mountCardsList.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if ($(`#card-list-${slugify(this.props.title)} .img-card`).length) {
            $(`#card-list-${slugify(this.props.title)} .img-card`).each(function() {
                $(this).fadeIn(2000);
            })
        }
        if ($(`#card-title-${slugify(this.props.title)}`).length) {
            $(`#card-title-${slugify(this.props.title)}`).fadeIn(2500);
        }
    }

    componentDidUpdate() {
        $(`#card-list-${slugify(this.props.title)} .img-card`).each(function() {
            $(this).fadeIn(2000);
        })
        $(`#card-title-${slugify(this.props.title)}`).fadeIn(2500);
    }

    componentWillUpdate() {
        $(`#card-list-${slugify(this.props.title)} .img-card`).fadeOut(500);
    }

    handleMouseOver(e) {
        $(e.target).animate({'opacity': '0.2'}, 500);
        let title = `${e.target.id}-title`;
        $(`#${title}`).show();
    }

    handleMouseOut(e) {
         $(e.target).animate({'opacity': '1'}, 500);
         let title = `${e.target.id}-title`;
        $(`#${title}`).hide();
    }

    handleClick(data) {
        this.props.onResult(data.title);
        this.props.hideMediaDetails(false);
        browserHistory.push(`/${data.type}/${data.id}/${data.titleUrl}`);
    }

    mountCardsList() {
        let limit = this.props.cardsLimit ? this.props.cardsLimit : 0;
        let mediaCard = [];
        this.props.media.forEach((value, index) => {
            if (limit > index || limit === 0) {
                mediaCard.push(value);
            }
        })
        return mediaCard.map((value, index) => 
            (
                <Grid.Column 
                    mobile={16}
                    tablet={4}
                    computer={2}
                    key={`media-${index}`}
                >
                    <Image 
                        src={value.image} 
                        className='img-card'
                        id={`card-${value.id}`}
                        style={{display: 'none'}}
                        onMouseOver={ this.handleMouseOver }
                        onMouseOut={ this.handleMouseOut }
                        onClick={ () => { this.handleClick(value) } }
                    />
                    <span 
                        className='title-card' 
                        id={`card-${value.id}-title`}
                        style={{display: 'none'}}
                    >{ value.title }</span>
                </Grid.Column>
            )
        )
    }

    render() {
        if (!this.props.media || this.props.media.length === 0) {
            return null;
        }
        const cardList = this.mountCardsList();
        let title = null;
        if (this.props.title && cardList.length > 0) {
            title = (
                <Grid.Row className='pb0'>
                    <Grid.Column>
                        <Header 
                            as={'h2'}
                            textAlign={'left'}
                            style={{textTransform: 'uppercase', color: 'white', display: 'none'}}
                            id={`card-title-${slugify(this.props.title)}`}
                        >
                            { this.props.title }
                        </Header>
                    </Grid.Column>
                </Grid.Row>
            )
        }
        return (
            <Grid className="ml2 mr2" id={ `card-list-${slugify(this.props.title)}` }>
                { title }
                { cardList }
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        option: state.option,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onResult: () => dispatch(actions.onResult()),
        hideMediaDetails: (hideMedia) => dispatch(actions.hideMediaDetails(hideMedia))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);