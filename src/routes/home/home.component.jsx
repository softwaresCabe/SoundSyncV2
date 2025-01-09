import { Outlet } from 'react-router-dom';

// import Directory from '../../components/directory/directory.component';
import Playlist from '../../components/playlist/playlist.component';

const Home = () => {
  return (
    <div>
      <Playlist />
    </div>
  );
};

export default Home;
