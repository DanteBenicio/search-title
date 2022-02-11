/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
