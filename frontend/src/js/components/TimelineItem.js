import React from 'react';
import { API_ENDPOINT_TOPICS, API_ENDPOINT } from './../constants/CONFIG';
import { TimelineItem }  from 'vertical-timeline-component-for-react';
import Topic from './Topic.js';
import { formatDate } from '../util/formatDate';

const axios = require('axios');


class TimeLineItem extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			date: this.props.value,
			topics: [],
		}
	}

	componentDidMount() {
		this.getTopics();
	}

	async getTopics() {
		axios.get(API_ENDPOINT_TOPICS, {
			crossDomain: true,
			params: {
			  date: this.state.date
			}
		}).then(function (response) {
            console.log(response);
            return response.data;
        }).then((data) => {
            this.setState({
                topics: data.topics,
            })
            console.log(this.state.topics);
        }).catch(function (error) {
            console.log(error);
        });
	}
	
	render() {
		return (
			<TimelineItem 
				dateText={formatDate(this.state.date)}
				dateInnerStyle={{ background: '#2FD3F8' }}
				style={{ color: '#2FD3F8' }}
				bodyContainerStyle={{
			      	background: '#E3F5F9',
			      	padding: '20px',
			      	borderRadius: '8px',
			    }}
			>
				{this.state.topics.map((topic) => (
					<Topic date={this.state.date} topic={topic} />
				))}
			</TimelineItem>
		);
	}
}

export default TimeLineItem;