import React, { Component } from 'react';
import { 
    Modal, 
    Button,
    List,
    Segment,
    Image,
    Grid,
    Input
} from 'semantic-ui-react';
import $ from 'jquery';
import _ from 'lodash';
import LoaderComponent from './LoaderComponent';
import { browserHistory } from 'react-router';

export default class ModalListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            loading: false,
            cast: [],
            perPage: 5,
            optMovie: {
                active: true,
                disabled: true,
                page: 1,
            },
            optTv: {
                active: false,
                disabled: false,
                page: 1,
            },
            search: {
                page: 1
            }
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOptionButton = this.handleOptionButton.bind(this);
        this.handleLoadImage = this.handleLoadImage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.setCastPage(false);
    }

    setCastPage(onScroll = true) {
        if (this.state.optMovie.active) {
            let movies = this.handlePageChange(this.props.movies, 'optMovie', onScroll);
            this.setState({ cast: movies });
        } else if (this.state.optTv.active) {
            let tvs = this.handlePageChange(this.props.tvs, 'optTv', onScroll);
            this.setState({ cast: tvs });
        }
    }

    handlePageChange(cast, option, onScroll = true) {
        if (onScroll) {
            let optionMedia = this.state[option];
            optionMedia.page += 1;
            this.setState({ [option]: optionMedia });
        }
        let newCast = cast.filter((value, index) => index < this.state[option].page * this.state.perPage && index < cast.length ? value : null );
        return newCast;
    }

    handleScroll() {
        const list = document.getElementById('cast-modal-list');
        const { offsetHeight, scrollHeight, scrollTop } = list;
        if (scrollHeight <= scrollTop + offsetHeight) {
            this.setCastPage();
        }
    }

    handleOptionButton() {
        $('#cast-modal-list').scrollTop(0);
        let cast;
        if (this.state.optMovie.active) {
            cast = this.handlePageChange(this.props.tvs, 'optTv', false);
            this.setState({
                optMovie: {
                    active: false,
                    disabled: false,
                    page: this.state.optMovie.page
                },
                optTv: {
                    active: true,
                    disabled: true,
                    page: this.state.optTv.page
                },
                cast
            })
        } else {
            cast = this.handlePageChange(this.props.movies, 'optMovie', false);
            this.setState({
                optMovie: {
                    active: true,
                    disabled: true,
                    page: this.state.optMovie.page
                },
                optTv: {
                    active: false,
                    disabled: false,
                    page: this.state.optTv.page
                },
                cast
            })
        }
    }

    handleOpenModal(e) { 
        this.setState({
            modalOpen: true,
        })
    }

    handleCloseModal(e) {
        this.setState({
            modalOpen: false,
        })
    }

    handleLoadImage(e) {
        $(e.target).css('visibility', 'visible').hide().fadeIn(1500);
    }

    handleSearch(e) {
        this.setState({ loading: true });
        let value = e.target.value;
        _.delay(() => {
            let cast = [];
            if (this.state.optMovie.active) {
                if (value.length > 0) {
                    cast = this.props.movies.filter((movie, index) => {
                        if (
                            movie.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                            movie.character.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                            movie.release.indexOf(value) !== -1
                        ) {
                            return movie;
                        } else return true;
                    })
                } else {
                    cast = this.handlePageChange(this.props.movies, 'optMovie', false);
                }
            }
            else if (this.state.optTv.active) {
                if (value.length > 0) {
                    cast = this.props.tvs.filter((tv, index) => {
                        if (
                            tv.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                            tv.character.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                            tv.release.indexOf(value) !== -1
                        ) {
                            return tv;
                        } else return true;
                    })
                } else {
                    cast = this.handlePageChange(this.props.tvs, 'optTv', false);
                }
            }

            this.setState({ cast, loading: false });
            return true;
            }, 1000);
        
    }

    mountCastItems(cast) {
        let castItems = cast.map((item, index) =>  
            (
                <List.Item 
                    key={ `cast-${index}` } 
                    style={{ height: '96px' }}>
                    <Image 
                        src={ item.poster } 
                        className="image-list"
                        style={{visibility: 'hidden'}}
                        onLoad={ this.handleLoadImage }
                        onClick={ () => this.handleClickImageCast(item) }
                    />
                    <List.Content>
                        <List.Header 
                            className='text-custom-green fs16 mb5'
                            onClick={ () => this.handleClickImageCast(item) }
                            style={{cursor: 'pointer'}}
                        >
                            { item.name }
                        </List.Header>
                        <span className='text-white'>
                            { item.description }
                        </span>
                    </List.Content>
                </List.Item>
            )
        )
        return castItems;
    }

    handleClickImageCast(item) {
        let media = this.state.optMovie.active ? 'movie' : 'serie';
        browserHistory.push(`/${media}/${item.id}/${item.slug}`);
    }

    render() {
        const trigger = (
            <span 
                onClick={this.handleOpenModal}
                className="trigger-modal fs16"
            >
                Ver todas atuações >>>
            </span>
        )
        const cast = this.mountCastItems(this.state.cast);
        const list = (
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
        );
        const loader = (
            <LoaderComponent 
                columns={1}
                _class='mt35'
                inline='centered' 
                size='massive'
                active={true}
                inverted={true}
            />
        )
        let view;
        if (this.state.loading) {
            view = loader;
        } else {
            view = list;
        }
        return (
            <Modal 
                trigger={ trigger }
                open={this.state.modalOpen}
                size={'small'}
                onClose={this.handleCloseModal}
                className='bgBlack'
                closeIcon={true}
            >
                <Modal.Content className='bgBlack'>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Button.Group>
                                <Button 
                                    inverted 
                                    color='green'
                                    active={ this.state.optMovie.active }
                                    disabled={ this.state.optMovie.disabled }
                                    onClick={ this.handleOptionButton }
                                >
                                    Filme
                                </Button>
                                <Button.Or text='ou'/>
                                <Button 
                                    inverted 
                                    color='green'
                                    active={ this.state.optTv.active }
                                    disabled={ this.state.optTv.disabled }
                                    onClick={ this.handleOptionButton }
                                >
                                    TV
                                </Button>
                            </Button.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <Input
                                icon='search'
                                placeholder='Busque...'
                                loading={false}
                                fluid
                                className='list-search'
                                onChange={ this.handleSearch }
                            />
                        </Grid.Column>
                    </Grid>
                    <Segment 
                        className='bgBlack pl0 pr0'
                        style={ {height: '300px'} }
                    >
                        { view }
                    </Segment>
                </Modal.Content>
            </Modal>
        );
    }
}