import './App.css';
import useFetch from 'react-fetch-hook';
import CoachCards from './components/CoachCards';
import CoachModal from './components/CoachModal';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
function App() {
  const refreshPage = () => {
    window.location.reload();
  };
  const url = 'https://randomuser.me/api';
  const { data, error } = useFetch(url + '?results=150');
  const [selectedCoach, setSelectedCoach] = useState();
  const [coachesList, setCoachesList] = useState();
  const [filterQuery, setFilterQuery] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (filterQuery) {
        //use the filter query
        const queryString = filterQuery.toLowerCase();
        const filterdeData = data?.results?.filter((coach) => {
          const fullname = `${coach.name.first} ${coach.name.last}`;

          // if it's just one letter, return all names that start with it
          if (queryString.length === 1) {
            const firstletter = fullname.charAt(0).toLocaleLowerCase();
            return firstletter === queryString;
          } else {
            return fullname.toLocaleLowerCase().includes(queryString);
          }
        });
        setCoachesList(filterdeData);
      } else {
        setCoachesList(data?.results.slice(0, 20));
        setIsLoading(false);
      }
    }, 500);
  }, [data, filterQuery]);

  return (
    <div className="bg-gray-100">
      <section>
        <form action="">
          <input
            type="text"
            placeholder="Rechercer un coach..."
            onChange={(event) => setFilterQuery(event.target.value)}
            className="mx-20 mt-6 rounded-md p-2"
          />
          <button
            onClick={refreshPage}
            className="cursor-pointer bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>
        </form>
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-20">
        {coachesList?.length < 1 && (
          <h2
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            Aucun résultat
          </h2>
        )}
        {isLoading && (
          <div className="text-center">
            <button
              type="button"
              className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded inline-flex items-center"
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 animate-spin mr-3"
                fill="blue"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              Processing
            </button>
          </div>
        )}
        <CoachCards
          coachesList={coachesList}
          setSelectedCoach={setSelectedCoach}
        />
      </section>
      <AnimatePresence>
        {selectedCoach && (
          <CoachModal
            coach={selectedCoach}
            setSelectedCoach={setSelectedCoach}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
