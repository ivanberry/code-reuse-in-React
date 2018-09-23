class BlogPost extends React.Compoent {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			blogPost: DataSource.getBlogPost(porps.id)
		};
	}

	componentWillMount() {
		DataSource.addChangeListener(this.handleChange);
	}

	componentWillUnmount() {
		DataSource.removeChangeListener(this.handleChange);
	}

	handleChange() {
		this.setState({
			blogPost: DataSource.getBlogPost(this.props.id)
		});
	}

	render() {
		return <TextBlock text={this.state.blogPost} />;
	}
}