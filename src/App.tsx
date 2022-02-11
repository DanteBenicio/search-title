/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type PostsProps = {
  title: string,
  body: string,
  id: number,
  userId: number
}

function App() {
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const { data } = response;

        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue) {
      const filteredPosts = posts.filter((post) => post.title.includes(searchValue));

      if (!filteredPosts.length) {
        setMessage('Posts não encontrado.');
      }

      setPosts(filteredPosts);
    } else {
      (async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
          const { data } = response;

          setPosts(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }

  return (
    <section className="section_container">
      <div className="input_group">
        <label htmlFor="input-search">Buscar Titulo</label>
        <input type="text" id="input-search" onChange={handleSearchTitle} />
      </div>
      <main className="posts_container">
        {!posts.length && (
          <p>{message}</p>
        )}
        {posts.map((post) => (
          <article className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))}
      </main>
    </section>
  );
}

export default App
