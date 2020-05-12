import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import TopStore from '../../components/topStores/topStore';

class TopStoreSlider extends Component {
    updateDimensions(){
        if (window.innerWidth<400){return 1}
        if (window.innerWidth<600) {return 2}
        return 6
    }

    componentDidMount() {
        this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillMount() {
		this.setState({
		  children: [],
		  activeItemIndex: 0,
	});
  
	setTimeout(() => {
	  this.setState({

		children: this.createChildren(),
	  })
	}, 100);
    }

    createChildren= () =>this.props.TStore.map(TStore => <TopStore key={TStore.id} TStore={TStore}/>);
    
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
    
    render() { 
        const { activeItemIndex, children} = this.state;
        return ( 
            <React.Fragment>
                <div className="col-sm-10 col-xs-12">
							<ItemsCarousel
                            // Carousel configurations
                            numberOfCards={this.updateDimensions()}
                            gutter={12}
                            showSlither={false}
                            firstAndLastGutter={true}
                            freeScrolling={false}
                            // Active item configurations
                            requestToChangeActive={this.changeActiveItem}
                            activeItemIndex={activeItemIndex}
                            activePosition={'center'}
                            chevronWidth={24}
                            rightChevron={'>'}
                            leftChevron={'<'}
                            outsideChevron={true}>
                                {children}
                            </ItemsCarousel>
						</div>
            </React.Fragment>
         );
    }
}
 
export default TopStoreSlider;