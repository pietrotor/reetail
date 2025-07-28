import { Link, Navigate } from "react-router";

function App() {
  return <Navigate to="/dashboard" />;
  return (
    <>
      <p className="m-2">Pages:</p>
      <ul className="flex flex-col gap-4 m-2 text-xl">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/signup/form">Signup Form</Link>
        </li>
        <li>
          <Link to="/signup/client-form">Client Signup Form</Link>
        </li>
        <li>
          <Link to="/plaid">Plaid</Link>
        </li>
        <li>
          <Link to="/signin">Signin</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
