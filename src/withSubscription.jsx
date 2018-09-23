/**
const CommentListWithSubscription = withSubscription(
	CommentList,
	(DataSrouce) => DataSrouce.getComments()
);


const BlogPostWithSubscription = withSubscription(
	BlogPost,
	(DataSrouce) => DataSrouce.getBlogPost(props.id)
)	
*/

function withSubscription(WrappedComponent, selectData) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.handleChange = this.handleChange.bind(this);
			this.state = {
				data: selectData(DataSrouce, props)
			}
		}

		componentWillMount() {
			DataSrouce.addChangeListener(this.handleChange);
		}

		componentWillUnmount() {
			DataSrouce.removeChangeListener(this.handleChange);
		}

		handleChange() {
			this.setState({
				data: selectData(DataSrouce, this.props)
			});
		}

		render() {
			return <WrappedComponent data={this.state.data} {...this.props} />;
		}
	}
}
