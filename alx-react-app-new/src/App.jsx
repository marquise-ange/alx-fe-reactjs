import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  return (
    <>
      <Header />
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <Counter />
      <MainContent />
      <Footer />
    </>
  );
}

export default App
