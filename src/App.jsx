import CardContextProvider from "./contexts/CardContextProvider";
import CardSection from "./components/CardSection";
import InputSection from "./components/InputSection";

function App() {
  return (
    <CardContextProvider>
      <main className="h-screen flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1">
        <CardSection />
        <InputSection />
      </main>
    </CardContextProvider>
  );
}

export default App