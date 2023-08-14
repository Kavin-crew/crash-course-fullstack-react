import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: 'React is being developed by Meta (formerly facebook)',
//     source: 'https://opensource.fb.com/',
//     category: 'technology',
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
//     source:
//       'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
//     category: 'society',
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: 'Lisbon is the capital of Portugal',
//     source: 'https://en.wikipedia.org/wiki/Lisbon',
//     category: 'society',
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];
function App() {
  const [showForm, setShowForm] = useState(false);
  // upon fetching data, we can set the state to empty array
  // then update the fact state to populate data from database
  const [facts, setFacts] = useState([]);

  // for supabase
  // useEffect accepts 2 arguments, a function and array or the dependency array
  // empty array means this will only run once during the App components load
  useEffect(function () {
    async function getFacts() {
      const { data: facts, error } = await supabase
        .from('react-fact-app')
        .select('*');
      // updating the state for the values from our fetch request
      setFacts(facts);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <span style={{ fontSize: '40px' }}>{count}</span>
//       <button
//         className="btn btn-large"
//         onClick={() => setCount(currentCount => currentCount + 1)}
//       >
//         +1
//       </button>
//     </div>
//   );
// }

function Header({ showForm, setShowForm }) {
  const appTitle = 'Today I Learned';

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm(show => !show)}
      >
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

// to check if url input is valid url
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('http://example.com');
  const [category, setCategory] = useState('');
  const textLength = text.length;

  function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid.
    // if so, create new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      console.log('there is data');
    }

    // 3. Create a new fact object
    const newFact = {
      id: Math.round(Math.random() * 1000000),
      // in javascript, if the key and value is same example text : text,
      // we can simple use text alone, same goes to source and category
      text,
      source,
      category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };

    // 4. Add the new fact to the UI: add the fact to state
    setFacts(facts => [newFact, ...facts]);
    // 5. Reset input fields
    setText('');
    setSource('');
    setCategory('');

    // 6. Close the form
    setShowForm(false);

    console.log(text, source, category);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={e => setSource(e.target.value)}
      />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map(cat => (
          <option key={cat.name} value={cat.name}>
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>

        {CATEGORIES.map(cat => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map(fact => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(cat => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesInteresting}</button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <p className="copyright">
      <span>&copy; Copyright by </span>
      <a
        className="twitter-link"
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
        rel="noreferrer"
      >
        Jonas Schmedtmann
      </a>
      <span>. Built by </span>
      <a
        className="github"
        target="_blank"
        href="https://github.com/Kavin-crew"
        rel="noreferrer"
      >
        KFA
      </a>
    </p>
  );
}

export default App;
