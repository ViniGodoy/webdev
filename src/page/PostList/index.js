import React from 'react';
import list from "../../dao";
import Post from '../../component/Post';

class PostList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filter: ""
        };
        this.filterChange = this.filterChange.bind(this);
    }

    filterChange(e) {
        this.setState(
            {
                filter: e.target.value
            }
        )
    }

    render() {
        let {posts, filter} = this.state;

        if (filter) {
            posts = posts.filter(({title=""}) => title.includes(filter));
        }
        return (
            <div>
                <div>
                    Filter: <input type="text" value={this.state.filter} onChange={this.filterChange} />
                </div>
                <div>
                    {posts.map(
                        p => <Post key={p.id} data={p} />
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        list().then(posts => {
            this.setState({posts: posts })
        });
    }
}

export default PostList;