import React, {Component} from 'react';
import {Comment} from 'somewhere';

class CommentList extends from Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			comments: DataSource.getComments()
		}
	}

	componentWillMount() {
		// 监听变化
		DataSource.addChangeListener(this.handleChange);
	}

	componentWillUnmount() {
		// 移除监听
		DataSource.removeChangeListener(this.handleChange);
	}

	handleChange() {
		// Update with change datas
		this.setState({
			comments: DataSource.getComments()
		})
	}

	render() {
		return (
			{
				this.state.comments.map((comment) => (
					<Comment comments={comment} key={comment.id} />
				))
			}
		)	
		}
	}

}