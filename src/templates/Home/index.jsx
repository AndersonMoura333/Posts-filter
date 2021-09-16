import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase()
        .includes(searchValue.toLowerCase());
    })
    :
    posts;


  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, []);
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);

  }

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
          onChange={handleChange}
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
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>

    </section>
  );

}

// export class Home2 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 20,
//     searchValue: ''

//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }




//   render() {



//     return
//   }
// }

