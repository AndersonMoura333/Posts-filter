import './styles.css';
import { Component } from 'react';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 20,
    searchValue: ''

  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos

    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })

  }
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase()
          .includes(searchValue.toLowerCase());
      })
      :
      posts;
    return (
      <section className="container">
        <div className="search-container">
          {
            !!searchValue && (
              <h1>
                Pequisa atual: {searchValue}
              </h1>

            )
          }
          <TextInput
            onChange={this.handleChange}
            Searchvalue={searchValue}
          />
        </div>

        {filteredPosts.length > 0 && (
          <div className="posts">

            {filteredPosts.map(filteredPosts => (
              <PostCard
                key={filteredPosts.id}
                post={filteredPosts}
              />
            )
            )}
          </div>
        )}
        {filteredPosts.length === 0 && (
          <p>Não existem posts contendo <strong>{searchValue}</strong>  =(</p>
        )}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="Mais posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>

      </section>
    );
  }
}
