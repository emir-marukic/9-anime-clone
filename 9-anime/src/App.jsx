function App() {
  return (
    <div>
      <a href="https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code">
        Login with AniList
      </a>
    </div>
  );
}

export default App;
