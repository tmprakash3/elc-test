/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchResult: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        try {
            axios.get(`http://localhost:3035?search=${e.target.value}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
                .then((response) => {
                    this.setState({ searchResult: response.data });
                }).catch((e) => console.log(e))

        } catch (error) {
            console.log("error", error);
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className="position-relative">
                    <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                        <DebounceInput debounceTimeout={400} type="text" onChange={(e) => this.onSearch(e)} />
                        <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                            <i className="material-icons close">close</i>
                        </a>
                    </div>
                    {/* <div className="search-container"> */}
                    {this.state.searchResult.length > 0 && this.state.showingSearch ?
                        <div className={(this.state.showingSearch ? "showing " : "") + "auto-search-container"} >
                            {/* <h3>Showing {this.state.searchResult.length} results  </h3> */}
                            {
                                this.state.searchResult.map((search) => {
                                    return (
                                        <div className="product" key={search._id}>
                                            <div className="product-cont">
                                                <div className="img-cont">
                                                    <img src={search.picture} alt={search.name} />
                                                </div>
                                                <div className="detail-cont">
                                                    <h4>{search.name}</h4>
                                                    <p>{search.price}</p>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                    )
                                })
                            }
                        </div> : null}
                </div>
                {/* </div> */}
            </header>
        );

    }


}

// Export out the React Component
module.exports = Menu;