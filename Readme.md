## 探寻React代码复用的几种方式

### Higher-Order Components

高阶组件，缩写HOC，是复用React代码的一种“高阶”技巧，它不属于Reat的一种API，而是一直开发模式。

定义：HOC是一个函数，它接收一个组件并返回一个新的组件。

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将props转化成UI，那HOC就是将组件转化成另一个组件，接触最多的就是Redux库的`connect`函数。

那HOC到底有什么用呢？

### Use HOCs for Cross-cutting concerns

[React mixins](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

React中，组件是代码复用的主要形式，但是有些情形下，有些情况传统的组件可能不能满足我们的需求。

举例说明，比如你有一个`CommentList`组件，根据外部数据来渲染`comments`列表。

```javascript
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
```

不久，你又需要一个组件，用来渲染某一单独的文章，我们可能采用类似的模式编写组件：

```javascript
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
```

这两个不是一模一样的，它们调用不同的方法，渲染了不同的UI，但是它们的实现有很多是一致的 ：

- 挂载时，对数据源添加监听
- 监听器中调用	`setState`
- 销毁时，移除了监听器

可以想想，在一个大型应用中，是否会重复类似的实现很多次呢？或许我们需要一个抽象的组件了。

我们可以通过一个函数(组件)，返回一个类似`CommentList`和`BlogPost`。 函数以props形式接收子组件和需要监听的数据。

```javascript
const CommentListWithSubscription = withSubscription(
	CommentList,
	(DataSrouce) => DataSrouce.getComments()
);


const BlogPostWithSubscription = withSubscription(
	BlogPost,
	(DataSrouce) => DataSrouce.getBlogPost(props.id)
)
```

- A HOC is a pure function with zero side-effects
- A HOC is just a normal function, you can add as many or as few arguments as you like.
- A HOC and the wrapped component is entirely props-based.
































