import { useMemo, useEffect, useRef, useState } from "react";
import "./App.css";
import { type User, SortBy } from "./types.d";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortBy = (sortBy: SortBy) => {
    const newSortingValue = sorting === SortBy.NONE ? sortBy : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=15")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [filterCountry, users]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first);
      });
    }

    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last);
      });
    }

    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      });
    }

    if (sorting === SortBy.NONE) return filteredUsers;
  }, [filteredUsers, sorting]);

  const handleDeleteUser = (email: string) => {
    const newUsers = users.filter((user) => email != user.email);
    setUsers(newUsers);
  };

  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={() => toggleSortBy(SortBy.COUNTRY)}>
          {sorting ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear usuarios</button>
        <input
          placeholder="Filtra por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        ></input>
      </header>
      <main>
        <UsersList
          showColors={showColors}
          users={sortedUsers}
          handleDeleteUser={handleDeleteUser}
          toggleSortBy={toggleSortBy}
        />
      </main>
    </>
  );
}

export default App;
