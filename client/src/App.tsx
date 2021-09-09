import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutations/user";

import "./App.css";

const App = () => {
	// Graphql
  const { data, loading, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });
  const [createNewUser] = useMutation(CREATE_USER);
	// State
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e: any) => {
    e.preventDefault();
    createNewUser({
      variables: {
        input: {
          username,
          age: Number(age),
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };

  const getAll = (e: any) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <input
          value={age}
          onChange={(e: any) => setAge(e.target.value)}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user: any) => (
          <div className="user" key={user.id}>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
