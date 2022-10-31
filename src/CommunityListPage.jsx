import { Link } from "react-router-dom";

export const CommunityListPage = ({ communities }) => {
  return (
    <div>
      <h1>Communities</h1>
      <ul>
        {communities.map((c) => (
          <Link key={c.localName} to={`/${c.localName.split(" ").join("-")}`}>
            <li>{c.localName}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
